import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { Product } from 'src/entities/products.entity';
import { ProductRequest } from 'src/dto/request/product.request';
import { ProductResponse } from 'src/dto/response/product.response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ResponseData<ProductResponse[]>> {
    try {
        return new ResponseData<ProductResponse[]>(await this.productService.getProducts(), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse[]>(null, 500, HttpMessage.ERROR);
    }
  }

  @Post()
  async createProduct(@Body() productRequest: ProductRequest): Promise<ResponseData<ProductResponse>> {
    try {
        return new ResponseData<ProductResponse>(await this.productService.createProduct(productRequest), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Get('/:id')
  async detailProduct(@Param('id') id: number): Promise<ResponseData<ProductResponse>> {
    try {
        return new ResponseData<ProductResponse>(await this.productService.detailProduct(id), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: number, @Body() productRequest: ProductRequest): Promise<ResponseData<ProductResponse>> {
    try {
        return new ResponseData<ProductResponse>(await this.productService.updateProduct(id, productRequest), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<ResponseData<boolean>> {
    try {
        return new ResponseData<boolean>(await this.productService.deleteProduct(id), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<boolean>(null, 500, HttpMessage.ERROR);
    }
  }
}
