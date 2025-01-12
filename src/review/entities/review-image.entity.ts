import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "./review.entity";


@Entity()
export class ReviewImage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string; 

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne( () => Review, review => review.id )
    reviewId: string;

}
