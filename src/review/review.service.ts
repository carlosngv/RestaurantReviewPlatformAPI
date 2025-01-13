import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { DataSource, Repository } from 'typeorm';
import { ReviewImage } from './entities/review-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository( Review )
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository( ReviewImage )
    private readonly reviewImageRepository: Repository<ReviewImage>,
    @InjectRepository( Restaurant )
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly dataSource: DataSource,
  ){}

    private handleDBErrors = ( error: any ) => {
      if( error.code === '23505' ) {
        throw new BadRequestException( error.detail );
      }
      console.log(error)
      throw new InternalServerErrorException('Please, check logs...');
    }

  async create(createReviewDto: CreateReviewDto, user: User) {

    const { images = [], restaurandId, ...reviewDetail } = createReviewDto;

    try {

      const review = this.reviewRepository.create({
        ...reviewDetail,
        images: images.map(img => ( this.reviewImageRepository.create({ url: img }) )),
        restaurant: await this.restaurantRepository.findOneBy({ id: restaurandId}),
        user,
      });

      await this.reviewRepository.save(review);

      return {
        review,
      };
    } catch (error) {
      this.handleDBErrors( error );
    }

  }

  findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: string) {

    const review = await this.reviewRepository.findOneBy({ id });

    if( !review ) 
      throw new NotFoundException(`Review with id ${ id } not found;`);

    return review
  }

  async findReviewsByAuthenticatedUser( user: User ) {
    
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    const reviews = await queryBuilder
      .where('review.userId = :id', { id: user.id })
      .getMany();
    
    return reviews
  }

  async findByRestaurant( restaurantId: string ){
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    const reviews = await queryBuilder
      .where('review.restaurantId = :id', { id: restaurantId })
      .getMany();
    
    return reviews
  }
 
  async update(id: string, updateReviewDto: UpdateReviewDto) {

    
    const { images = [], ...updateData } = updateReviewDto;
    
    const review = await this.reviewRepository.preload( { id, ...updateData } );

    if( !review )
      throw new NotFoundException(`Review with id ${ id } not found;`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {

      if( images.length > 0 ) {
        await queryRunner.manager.delete( ReviewImage, { review: { id } });
        review.images = images.map( img => this.reviewImageRepository.create({ url: img }));
      }

      await queryRunner.manager.save( review );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      
      return { ok: true };

    } catch (error) {

      await queryRunner.release();
      this.handleDBErrors( error );

    }
  }

  async remove(id: string) {
    
    await this.findOne( id );
    const queryBuilder = this.reviewRepository.createQueryBuilder();
    
    try {
      await queryBuilder
        .delete()
        .from( Review)
        .where("id = :id", { id })
        .execute();
      
      return {
        ok: true,
      }
      
    } catch (error) {
      this.handleDBErrors( error );
    }


  }
}
