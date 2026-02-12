import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): string;
    findAll(): import("./entities/item.entity").Item[];
    findOne(id: string): string;
    update(id: string, updateItemDto: UpdateItemDto): string;
    remove(id: string): string;
}
