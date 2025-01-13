import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.entity";
import { User } from "src/auth/entities/user.entity";


@Entity()
export class ReviewLike {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne( () => Review, review => review.id )
    review: Review;

    @ManyToOne( () => User, user => user.id )
    user: User;

}
