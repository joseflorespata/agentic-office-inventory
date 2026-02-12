import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Item } from './item.entity';

export enum TransactionType {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  itemId: number;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  previousStock: number;

  @Column({ type: 'int' })
  newStock: number;

  @Column({ type: 'varchar', length: 255, default: 'system' })
  user: string;

  @CreateDateColumn()
  timestamp: Date;
}
