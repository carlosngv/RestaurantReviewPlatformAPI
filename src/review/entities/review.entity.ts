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

    @OneToMany( () => ReviewImage, reviewImage => reviewImage.review, {
        cascade: true,
        eager: true,
    })
    images: ReviewImage[];

    @OneToMany( () => ReviewComment, reviewComment => reviewComment.review, {
        cascade: true,
        eager: true,
    })
    comments: ReviewComment[];

    @OneToMany( () => ReviewLike, reviewLike => reviewLike.review, {
        cascade: true,
        eager: true,
    })
    likes: ReviewLike[];

    @ManyToOne( () => User, user => user.id )
    user: User;

    @ManyToOne( () => Restaurant, restaurant => restaurant.id )
    restaurant: Restaurant;
    
    

}
