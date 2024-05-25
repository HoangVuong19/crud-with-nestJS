import { Body, Controller, Delete, Get, Param, Post, Put, Req, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { Product } from 'src/models/product.model';
import { ProductRequest } from 'src/dto/request/product.request';
import { ProductResponse } from 'src/dto/response/product.response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): ResponseData<Product[]> {
    try {
        return new ResponseData<Product[]>(this.productService.getProducts(), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<Product[]>(null, 500, HttpMessage.ERROR);
    }
  }

  @Post()
  createProduct(@Body() productRequest: ProductRequest): ResponseData<ProductResponse> {
    try {
        return new ResponseData<ProductResponse>(this.productService.createProduct(productRequest), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Get('/:id')
  detailProduct(@Param('id') id: number): ResponseData<ProductResponse> {
    try {
        return new ResponseData<ProductResponse>(this.productService.detailProduct(id), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() productRequest: ProductRequest): ResponseData<ProductResponse> {
    try {
        return new ResponseData<ProductResponse>(this.productService.updateProduct(id, productRequest), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<ProductResponse>(null, 500, HttpMessage.ERROR);
    }
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number): ResponseData<boolean> {
    try {
        return new ResponseData<boolean>(this.productService.deleteProduct(id), 200, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<boolean>(null, 500, HttpMessage.ERROR);
    }
  }
}
