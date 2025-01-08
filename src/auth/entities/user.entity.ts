import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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


}
