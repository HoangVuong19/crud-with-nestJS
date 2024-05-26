import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entity";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'int', name: 'price' })
    price:number;

    @Column({ type: 'varchar', name: 'product_name' })
    productName:string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category:Category;

    constructor(price: number, productName: string, category: Category) {
        super();
        this.price = price;
        this.productName = productName;
        this.category = category;
    }
}