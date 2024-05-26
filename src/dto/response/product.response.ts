export class ProductResponse {
    id?: number;
    categoryName?: string;
    price?: number;
    productName?: string;
    
    constructor(id?: number, categoryName?: string, price?: number, productName?: string) {
        this.id = id;
        this.categoryName = categoryName;
        this.price = price;
        this.productName = productName;
    }
}