import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', name: 'category_name' })
    categoryName:string;

    @Column({ type: 'varchar', name: 'description' })
    description:string;
}