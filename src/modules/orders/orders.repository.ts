import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base-repository';
import { DataSource } from 'typeorm';
import { Order } from './orders.entity';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class OrdersRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async getOrders() {
    return await this.getRepository(Order).find({
      relations: {
        items: {
          product: true,
        },
      },
    });
  }

  async createOrder(orderNo: string) {
    const ordersRepository = this.getRepository(Order);

    const order = ordersRepository.create({
      date: new Date(),
      orderNo: orderNo,
    });
    await ordersRepository.insert(order);

    return order;
  }
}
