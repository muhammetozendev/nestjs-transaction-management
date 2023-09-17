import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../items/items.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @OneToMany((type) => Item, (item) => item.product)
  items: Item[];
}
