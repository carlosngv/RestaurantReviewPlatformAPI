import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantImage } from "./restaurant-image.entity";
import { Review } from "src/review/entities/review.entity";

@Entity()
export class Restaurant {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('text')
    description: string;

    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany( () => RestaurantImage, restaurantImage => restaurantImage.restaurant, {
        cascade: true,
        eager: true,
    } )
    images: RestaurantImage[];

    @OneToMany( () => Review, review => review.id )
    reviews: Review[];

}
