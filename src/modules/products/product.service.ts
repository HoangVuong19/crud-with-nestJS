import { Injectable } from '@nestjs/common';
import { ProductRequest } from 'src/dto/request/product.request';
import { ProductResponse } from 'src/dto/response/product.response';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  private productList: Product[] = [
    {id: 1, price: 10000, categoryId: 1, productName: 'iphone11'},
    {id: 2, price: 20000, categoryId: 2, productName: 'laptop accer'},
    {id: 3, price: 30000, categoryId: 3, productName: 'PC'},
  ]

  getProducts(): Product[] {
    return this.productList;
  }

  createProduct(productRequest: ProductRequest): ProductResponse {
    const product: Product = {
      id: Math.random(),
      ...productRequest
    }
    this.productList.push(product)
    const productResponse: ProductResponse = {
      ...product
    }
    return productResponse;
  }

  detailProduct(id: number): ProductResponse {
    const product = this.productList.find(product => product.id === Number(id));
    if (product) {
      return product;
    }
    return null;
  }

  updateProduct(id: number, productRequest: ProductRequest): ProductResponse {
    const product = this.productList.find(product => product.id === Number(id));

    if (product) {
      Object.assign(product, productRequest);
      return product;
    }
    return null;
  }

  deleteProduct(id: number): boolean {
    const product = this.productList.find(product => product.id === Number(id));
    if (product) {
      this.productList.splice(id, 1)
      return true;
    }
    return false;
  }
}
