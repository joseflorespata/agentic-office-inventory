import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemCategory } from './entities/item.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
