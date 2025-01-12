import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  private handleDBErrors = ( error: any ) => {
    if( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }
    console.log(error)
    throw new InternalServerErrorException('Please, check logs...');
  }

  async create(createUserDto: CreateUserDto) {

    const { password, ...userData } = createUserDto;

    try {
      const newUser = this.userRepository.create( {
        ...userData,
        password: BcryptAdapter.hashPassword( password ),
      } );
      
      await this.userRepository.save( newUser );

      const token = this.jwtService.sign({ id: newUser.id });

      await this.emailService.sendEmail( userData.email, token );
      
      return {
        ...userData,
        token,
      };

    } catch (error) {
      this.handleDBErrors( error );
    }

  }

  async loginUser( loginUserDto: LoginUserDto ) {
    const { username, password } = loginUserDto;
    
    const dbUser = await this.userRepository.findOne({ where: { username }, select: {
      password: true,
      email: true,
      username: true,
      fullName: true,
      profilePicture: true,
      id: true,
    } });

    if( !dbUser )
      throw new NotFoundException(`User ${ username } does not exists`);

    if( !BcryptAdapter.compareHash( password, dbUser.password )) 
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      email: dbUser.email,
      username: dbUser.username,
      fullName: dbUser.fullName,
      profilePicture: dbUser.profilePicture,
      token: this.jwtService.sign({ id: dbUser.id }),
    }
  }

  activateUser( token: string ) {
    const { id } = this.jwtService.verify( token );

    if( !id )
      throw new BadRequestException('Token is not valid');

    try {
      this.userRepository.createQueryBuilder()
        .update(User)
        .set({ isEmailConfirmed: true })
        .where({ id })
        .execute();
  
      return {
        msg: 'Email successfully confirmed'
      };
      
    } catch (error) {
      this.handleDBErrors( error );
    }

  }

 
}
