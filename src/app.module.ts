import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ItemsModule } from './modules/items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './modules/products/products.entity';
import { Order } from './modules/orders/orders.entity';
import { Item } from './modules/items/items.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE,
      entities: [Product, Order, Item],
      synchronize: true,
      logging: true,
      dropSchema: true, // start with a clean db on each run, DO NOT USE FOR PRODUCTION
    }),
    ProductsModule,
    OrdersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.dataSource.query(`
        insert into product (title, price) values
            ('Computer', 1000), ('Mouse', 19);
    `);
  }
}
