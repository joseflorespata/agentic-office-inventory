import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Item, ItemCategory } from './entities/item.entity';
import { Transaction, TransactionType } from './entities/transaction.entity';

@Injectable()
export class ItemsService {
  // Mock data for initial development
  private mockItems: Item[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS 15',
      description: 'Laptop para desarrollo de software',
      category: ItemCategory.HARDWARE,
      stock: 5,
      unitPrice: 1500.00,
      criticalLimit: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Mouse Logitech MX Master 3',
      description: 'Mouse ergonómico inalámbrico',
      category: ItemCategory.PERIFERICOS,
      stock: 15,
      unitPrice: 99.99,
      criticalLimit: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Resma de Papel A4',
      description: 'Papel blanco tamaño carta, 500 hojas',
      category: ItemCategory.PAPELERIA,
      stock: 3,
      unitPrice: 4.50,
      criticalLimit: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Monitor LG UltraWide 34"',
      description: 'Monitor panorámico para productividad',
      category: ItemCategory.HARDWARE,
      stock: 8,
      unitPrice: 450.00,
      criticalLimit: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'Teclado Mecánico Keychron K2',
      description: 'Teclado mecánico wireless',
      category: ItemCategory.PERIFERICOS,
      stock: 1,
      unitPrice: 89.99,
      criticalLimit: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll(): Item[] {
    return this.mockItems;
  }

  findOne(id: number): Item {
    const item = this.mockItems.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  createTransaction(
    itemId: number,
    createTransactionDto: CreateTransactionDto,
  ): Item {
    // 1. Buscar el item
    const item = this.findOne(itemId);

    // 2. Guardar stock anterior
    const previousStock = item.stock;

    // 3. Validar stock para SALIDA
    if (createTransactionDto.type === TransactionType.SALIDA) {
      if (createTransactionDto.quantity > item.stock) {
        throw new BadRequestException(
          `Stock insuficiente. Stock actual: ${item.stock}, cantidad solicitada: ${createTransactionDto.quantity}`,
        );
      }
    }

    // 4. Calcular nuevo stock
    let newStock: number;
    if (createTransactionDto.type === TransactionType.ENTRADA) {
      newStock = item.stock + createTransactionDto.quantity;
    } else {
      newStock = item.stock - createTransactionDto.quantity;
    }

    // 5. Validación adicional: el stock nunca puede ser negativo
    if (newStock < 0) {
      throw new BadRequestException(
        'La transacción resultaría en stock negativo',
      );
    }

    // 6. Actualizar el stock del item
    item.stock = newStock;
    item.updatedAt = new Date();

    // 7. Crear registro de transacción (en un sistema real, esto se guardaría en DB)
    const transaction: Transaction = {
      id: Date.now(), // Mock ID
      itemId: item.id,
      item: item,
      type: createTransactionDto.type,
      quantity: createTransactionDto.quantity,
      previousStock,
      newStock,
      user: createTransactionDto.user || 'system',
      timestamp: new Date(),
    };

    // En un sistema real con TypeORM, guardaríamos la transacción aquí
    // await this.transactionRepository.save(transaction);

    // 8. Retornar el item actualizado
    return item;
  }
}
