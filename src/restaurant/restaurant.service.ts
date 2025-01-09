import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository( Restaurant )
    private readonly restaurantRepository: Repository<Restaurant>
  ){}

  private handleDBErrors = ( error: any ) => {
    if( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }
    console.log(error)
    throw new InternalServerErrorException('Please, check logs...');
  }

  async create(createRestaurantDto: CreateRestaurantDto) {

    try {
      const restaurant = this.restaurantRepository.create( createRestaurantDto );
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

    await this.findOne( id );

    await this.restaurantRepository
      .createQueryBuilder()
      .update()
      .set( updateRestaurantDto )
      .where('id=:id', { id })
      .execute();
    
    return { ok: true };

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
