import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../orders/orders.entity';
import { Product } from '../products/products.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne((type) => Order, (order) => order.items)
  order: Order;

  @ManyToOne((type) => Product, (product) => product.items)
  product: Product;
}
