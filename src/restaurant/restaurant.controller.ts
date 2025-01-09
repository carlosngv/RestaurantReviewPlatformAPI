import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './helpers/file-validation';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/file-namer';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantService.remove(id);
  }

  // TODO: Implement S3 upload
  @Post('restaurant-image/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './static/restaurants',
      filename: fileNamer,
    })
  }))
  uploadFile(@UploadedFile( FileValidationPipe ) file: Express.Multer.File, @Param('id') id: string ) {

    // TODO: Bind image to restaurant
    return {
      file,
      id
    }
  }

}
