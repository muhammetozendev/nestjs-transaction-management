import { Injectable } from '@nestjs/common';
import { ItemsRepository } from './items.repository';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private itemsRepository: ItemsRepository) {}

  async createItems(orderId: number, items: CreateItemDto[]) {
    await this.itemsRepository.createItems(orderId, items);
  }
}
