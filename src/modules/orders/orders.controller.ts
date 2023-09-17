import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateItemDto } from '../items/dtos/create-item.dto';
import { OrdersService } from './orders.service';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async createOrder(
    @Body(new ParseArrayPipe({ items: CreateItemDto }))
    data: CreateItemDto[],
  ) {
    return await this.ordersService.createOrder(data);
  }
}
