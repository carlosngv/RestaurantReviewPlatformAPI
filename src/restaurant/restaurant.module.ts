import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantImage } from './entities/restaurant-image.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Restaurant, RestaurantImage ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [ TypeOrmModule ]
})
export class RestaurantModule {}
