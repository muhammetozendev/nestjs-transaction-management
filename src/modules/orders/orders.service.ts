import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../items/dtos/create-item.dto';
import { OrdersRepository } from './orders.repository';
import { randomUUID } from 'crypto';
import { ItemsService } from '../items/items.service';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsService: ItemsService,
  ) {}

  async getOrders() {
    return await this.ordersRepository.getOrders();
  }

  async createOrder(items: CreateItemDto[]) {
    const orderNo = `ORD_${randomUUID()}`;
    const order = await this.ordersRepository.createOrder(orderNo);
    await this.itemsService.createItems(order.id, items);
    return order;
  }
}
