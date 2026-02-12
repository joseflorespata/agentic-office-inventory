import { TransactionType } from '../entities/transaction.entity';
export declare class CreateTransactionDto {
    type: TransactionType;
    quantity: number;
    user?: string;
}
