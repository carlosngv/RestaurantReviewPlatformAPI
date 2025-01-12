import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReviewImage } from "./review-image.entity";
import { User } from "src/auth/entities/user.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { ReviewComment } from "./review-comment.entity";
import { ReviewLike } from "./review-like.entity";


@Entity()
export class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    content: string; 

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany( () => ReviewImage, reviewImage => reviewImage.id)
    images: ReviewImage[];

    @OneToMany( () => ReviewComment, reviewComment => reviewComment.id)
    comments: ReviewComment[];

    @OneToMany( () => ReviewLike, reviewLike => reviewLike.id )
    likes: ReviewLike[];

    @ManyToOne( () => User, user => user.id )
    userId: string;

    @ManyToOne( () => Restaurant, restaurant => restaurant.id )
    restaurantId: string;
    
    

}
