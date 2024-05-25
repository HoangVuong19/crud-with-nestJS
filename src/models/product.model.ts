export class Product {
    id?: number;
    categoryId?: number;
    price?: number;
    productName?: string;
    
    constructor(id?: number, categoryId?: number, price?: number, productName?: string) {
        this.id = id;
        this.categoryId = categoryId;
        this.price = price;
        this.productName = productName;
    }
}