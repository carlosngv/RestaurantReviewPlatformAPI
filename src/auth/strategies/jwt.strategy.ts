
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {

    const { id } = payload;
    
    if( !id )
        throw new UnauthorizedException('Invalid token')
    
    const dbUser = await this.userRepository.findOneBy( { id } );
    
    if( !dbUser )
        throw new UnauthorizedException('Invalid token');

    if( !dbUser.isActive )
        throw new UnauthorizedException('User is not active, contact your administrator');

    return dbUser
    

  }
}
