import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.entity";


@Entity()
export class ReviewComment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string; 

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne( () => Review, review => review.id )
    reviewId: string;

}
