import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
export declare class ItemsService {
    private mockItems;
    create(createItemDto: CreateItemDto): string;
    findAll(): Item[];
    findOne(id: number): string;
    update(id: number, updateItemDto: UpdateItemDto): string;
    remove(id: number): string;
}
