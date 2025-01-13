import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { DataSource, Repository } from 'typeorm';
import { RestaurantImage } from './entities/restaurant-image.entity';

@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository( Restaurant )
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository( RestaurantImage )
    private readonly restaurantImageRepository: Repository<RestaurantImage>,
    private readonly dataSource: DataSource,
  ){}

  private handleDBErrors = ( error: any ) => {
    if( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }
    console.log(error)
    throw new InternalServerErrorException('Please, check logs...');
  }

  async create(createRestaurantDto: CreateRestaurantDto) {

    const { images = [], ...restaurantData } = createRestaurantDto;

    try {
      const restaurant = this.restaurantRepository.create({
        ...restaurantData,
        images: images.map( img => ( this.restaurantImageRepository.create({ url: img }) )),
      });
      await this.restaurantRepository.save( restaurant );
      return {ok: true, restaurant };
    } catch (error) {
      this.handleDBErrors( error );
    }
    
  }

  async findAll() {
    const restaurants = await this.restaurantRepository.find();
    return { ok: true, restaurants } 
  }

  async findOne(id: string) {

    const restaurant = await this.restaurantRepository.findOneBy({ id });

    if( !restaurant )
        throw new NotFoundException(`Restaurant with id ${id} not found.`);

    return { ok: true, restaurant };
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {

    const { images, ...restaurantData } = updateRestaurantDto;

    const restaurant = await this.restaurantRepository.preload({ id, ...restaurantData });
    if( !restaurant )
        throw new NotFoundException(`Restaurant with id ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      // ? Deletes and add new images
      if( images ) {
          await queryRunner.manager.delete( RestaurantImage, { restaurant: { id }} );
          restaurant.images = images.map( img => ( this.restaurantImageRepository.create({ url: img }) ));
      }
  
      await queryRunner.manager.save( restaurant );
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { ok: true }

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBErrors( error );
    }

  }

  async remove(id: string) {

    await this.findOne( id );

    await this.restaurantRepository
      .createQueryBuilder()
      .delete()
      .where('id=:id', { id })
      .execute();

    return { ok: true };
  }
}
