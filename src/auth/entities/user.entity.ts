import { ReviewLike } from "src/review/entities/review-like.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    username: string;
    
    @Column('text', {
        select: false,
    })
    password: string;
    
    @Column('text')
    fullName: string;
    
    @Column('text', {
        unique: true
    })
    email: string;
    
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('text', {
        nullable: true
    })
    profilePicture: string;
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column('bool', {
        default: false,
    })
    isEmailConfirmed: boolean;

    @OneToMany( () => Review, review => review.id )
    reviews: Review[];

    @OneToMany( () => ReviewLike, reviewLike => reviewLike.id )
    likes: ReviewLike[];

}
