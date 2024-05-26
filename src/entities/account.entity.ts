import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column('username')
    username:string;

    @Column('password')
    password:string;

    @Column('role')
    role:string;
}