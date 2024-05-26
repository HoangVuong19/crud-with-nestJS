import { IsNotEmpty, MinLength } from "class-validator";

export class ProductRequest{
    categoryId?: number;
    
    price?: number;

    @MinLength(1, {message: "please enter product name with more five characters"})
    productName?: string;
    
    constructor(categoryId?: number, price?: number, productName?: string) {
        this.categoryId = categoryId;
        this.price = price;
        this.productName = productName;
    }
}