import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRequest } from 'src/dto/request/product.request';
import { ProductResponse } from 'src/dto/response/product.response';
import { Category } from 'src/entities/categories.entity';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>){}

  async getProducts(): Promise<ProductResponse[]> {
    const productList: Product[] = await this.productRepository.find({ relations: ['category'] });

    const productResponseList: ProductResponse[] = productList.map(product => {
      const productResponse = new ProductResponse();
      productResponse.id = product.id;
      productResponse.categoryName = product.category ? product.category.categoryName : null;
      productResponse.price = product.price;
      productResponse.productName = product.productName;
      return productResponse;
    });

    return productResponseList;
  }

  async createProduct(productRequest: ProductRequest): Promise<ProductResponse> {
    const category = await this.categoryRepository.findOneBy({ id: productRequest.categoryId });

    if (!category) {
      throw new Error('Category not found');
    }

    const newProduct = new Product(
      productRequest.price,
      productRequest.productName,
      category
    );
    const product = await this.productRepository.save(newProduct);

    const productResponse = new ProductResponse(
      product.id,
      product.category.categoryName,
      product.price,
      product.productName
    );

    return productResponse;
  }

  async detailProduct(id: number):  Promise<ProductResponse | null> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });

    if (product) {
      const productResponse = new ProductResponse(
        product.id,
        product.category.categoryName,
        product.price,
        product.productName
      );
      return productResponse;
    }
    return null;
  }

  async updateProduct(id: number, productRequest: ProductRequest): Promise<ProductResponse | null> {
    const category = await this.categoryRepository.findOneBy({ id: productRequest.categoryId });

    if (!category) {
      throw new Error('Category not found');
    }

    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });

    if (product) {
      Object.assign(product, productRequest);
      product.category = category;
      const productUpdated = await this.productRepository.save(product);
      
      const productResponse = new ProductResponse(
        productUpdated.id,
        productUpdated.category.categoryName,
        productUpdated.price,
        productUpdated.productName
      );
      return productResponse;
    }
    return null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.productRepository.findOneBy({id});
    if (product) {
      await this.productRepository.delete(id);
      return true;
    }
    return false;
  }
}
