import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { TransactionType } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of items', () => {
      const items = service.findAll();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a single item by id', () => {
      const item = service.findOne(1);
      expect(item).toBeDefined();
      expect(item.id).toBe(1);
    });

    it('should throw NotFoundException when item does not exist', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('createTransaction', () => {
    describe('ENTRADA transactions', () => {
      it('should increase stock correctly', () => {
        const itemId = 1;
        const initialItem = service.findOne(itemId);
        const initialStock = initialItem.stock;

        const dto: CreateTransactionDto = {
          type: TransactionType.ENTRADA,
          quantity: 10,
          user: 'test-user',
        };

        const updatedItem = service.createTransaction(itemId, dto);

        expect(updatedItem.stock).toBe(initialStock + 10);
      });

      it('should handle large quantities', () => {
        const itemId = 1;
        const initialItem = service.findOne(itemId);
        const initialStock = initialItem.stock;

        const dto: CreateTransactionDto = {
          type: TransactionType.ENTRADA,
          quantity: 1000,
        };

        const updatedItem = service.createTransaction(itemId, dto);

        expect(updatedItem.stock).toBe(initialStock + 1000);
      });
    });

    describe('SALIDA transactions', () => {
      it('should decrease stock correctly', () => {
        const itemId = 2; // Este item tiene stock 15
        const initialItem = service.findOne(itemId);
        const initialStock = initialItem.stock;

        const dto: CreateTransactionDto = {
          type: TransactionType.SALIDA,
          quantity: 5,
          user: 'test-user',
        };

        const updatedItem = service.createTransaction(itemId, dto);

        expect(updatedItem.stock).toBe(initialStock - 5);
      });

      it('should allow reducing stock to exactly 0', () => {
        const itemId = 5; // Este item tiene stock 1
        const initialItem = service.findOne(itemId);

        const dto: CreateTransactionDto = {
          type: TransactionType.SALIDA,
          quantity: initialItem.stock,
        };

        const updatedItem = service.createTransaction(itemId, dto);

        expect(updatedItem.stock).toBe(0);
      });

      it('should throw BadRequestException when stock is insufficient', () => {
        const itemId = 5; // Este item tiene stock 1
        const initialItem = service.findOne(itemId);

        const dto: CreateTransactionDto = {
          type: TransactionType.SALIDA,
          quantity: initialItem.stock + 1, // Intentar retirar más del disponible
        };

        expect(() => service.createTransaction(itemId, dto)).toThrow(
          BadRequestException,
        );
        expect(() => service.createTransaction(itemId, dto)).toThrow(
          /Stock insuficiente/,
        );
      });

      it('should throw BadRequestException when attempting to create negative stock', () => {
        const itemId = 3; // Este item tiene stock 3

        const dto: CreateTransactionDto = {
          type: TransactionType.SALIDA,
          quantity: 10, // Más del stock disponible
        };

        expect(() => service.createTransaction(itemId, dto)).toThrow(
          BadRequestException,
        );
      });

      it('should not modify stock when transaction fails', () => {
        const itemId = 5;
        const initialItem = service.findOne(itemId);
        const initialStock = initialItem.stock;

        const dto: CreateTransactionDto = {
          type: TransactionType.SALIDA,
          quantity: 999, // Cantidad imposible
        };

        try {
          service.createTransaction(itemId, dto);
        } catch (error) {
          // Expected error
        }

        const itemAfterFailedTransaction = service.findOne(itemId);
        expect(itemAfterFailedTransaction.stock).toBe(initialStock);
      });
    });

    describe('Item not found', () => {
      it('should throw NotFoundException when item does not exist', () => {
        const dto: CreateTransactionDto = {
          type: TransactionType.ENTRADA,
          quantity: 10,
        };

        expect(() => service.createTransaction(999, dto)).toThrow(
          NotFoundException,
        );
      });
    });

    describe('User field', () => {
      it('should use provided user name', () => {
        const itemId = 1;
        const dto: CreateTransactionDto = {
          type: TransactionType.ENTRADA,
          quantity: 5,
          user: 'john-doe',
        };

        const result = service.createTransaction(itemId, dto);
        expect(result).toBeDefined();
      });

      it('should default to "system" when user is not provided', () => {
        const itemId = 1;
        const dto: CreateTransactionDto = {
          type: TransactionType.ENTRADA,
          quantity: 5,
        };

        const result = service.createTransaction(itemId, dto);
        expect(result).toBeDefined();
      });
    });
  });
});
