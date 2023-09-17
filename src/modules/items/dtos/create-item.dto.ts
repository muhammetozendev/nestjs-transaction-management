import { IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
