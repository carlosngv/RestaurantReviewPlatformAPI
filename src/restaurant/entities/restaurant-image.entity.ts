import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class RestaurantImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string;

    @ManyToOne( () => Restaurant, res => res.id, {
        onDelete: 'CASCADE'
    })
    restaurant: Restaurant;
}