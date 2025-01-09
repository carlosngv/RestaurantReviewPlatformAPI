import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RestaurantImage } from "./restaurant-image.entity";

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

    @OneToMany( (type) => RestaurantImage, restaurantImage => restaurantImage.restaurant, {
        cascade: true,
        eager: true,
    } )
    images: RestaurantImage[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
