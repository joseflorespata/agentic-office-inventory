import { IsEnum, IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser mayor a 0' })
  quantity: number;

  @IsOptional()
  @IsString()
  user?: string;
}
