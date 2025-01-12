import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewImage } from './entities/review-image.entity';
import { ReviewComment } from './entities/review-comment.entity';
import { ReviewLike } from './entities/review-like.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
      AuthModule,
      TypeOrmModule.forFeature([ Review, ReviewImage, ReviewComment, ReviewLike ]),
    ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
