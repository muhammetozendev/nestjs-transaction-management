import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base-repository';
import { DataSource } from 'typeorm';
import { Product } from './products.entity';

@Injectable({ scope: Scope.REQUEST })
export class ProductsRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async getAllProducts() {
    return await this.getRepository(Product).find();
  }
}
