import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): string;
    findAll(): import("./entities/item.entity").Item[];
    findOne(id: string): import("./entities/item.entity").Item;
    createTransaction(id: string, createTransactionDto: CreateTransactionDto): import("./entities/item.entity").Item;
    update(id: string, updateItemDto: UpdateItemDto): string;
    remove(id: string): string;
}
