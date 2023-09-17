import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getAllProducts() {
    return await this.productsRepository.getAllProducts();
  }
}
