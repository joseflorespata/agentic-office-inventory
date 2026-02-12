import { Item } from './item.entity';
export declare enum TransactionType {
    ENTRADA = "ENTRADA",
    SALIDA = "SALIDA"
}
export declare class Transaction {
    id: number;
    itemId: number;
    item: Item;
    type: TransactionType;
    quantity: number;
    previousStock: number;
    newStock: number;
    user: string;
    timestamp: Date;
}
