export enum TransactionType {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

export interface CreateTransactionDto {
  type: TransactionType;
  quantity: number;
  user?: string;
}
