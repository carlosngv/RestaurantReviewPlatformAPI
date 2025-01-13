import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.enum';
import { User } from 'src/auth/entities/user.entity';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth(ValidRoles.user)
  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ) {
    return this.reviewService.create(createReviewDto, user);
  }

  @Auth(ValidRoles.user)
  @Get('authenticated-user')
  findReviewsByAuthenticatedUse(
    @GetUser() user: User
  ) {
    return this.reviewService.findReviewsByAuthenticatedUser( user );
  }

  @Get('restaurant/:id')
  findReviewsByRestaurant(
    @Param('id') id: string
  ) {
    return this.reviewService.findByRestaurant( id );
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Get(':restaurantId')
  findByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return this.reviewService.findByRestaurant(restaurantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
