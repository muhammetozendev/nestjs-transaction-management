import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base-repository';
import { DataSource } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable({ scope: Scope.REQUEST })
export class ItemsRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  // Create multiple items
  async createItems(orderId: number, data: CreateItemDto[]) {
    const items = data.map((e) => {
      return {
        order: { id: orderId },
        product: { id: e.productId },
        quantity: e.quantity,
      } as Item;
    });

    await this.getRepository(Item).insert(items);
  }
}
