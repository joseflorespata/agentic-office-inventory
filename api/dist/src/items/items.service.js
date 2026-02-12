"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const item_entity_1 = require("./entities/item.entity");
let ItemsService = class ItemsService {
    mockItems = [
        {
            id: 1,
            name: 'Laptop Dell XPS 15',
            description: 'Laptop para desarrollo de software',
            category: item_entity_1.ItemCategory.HARDWARE,
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
            category: item_entity_1.ItemCategory.PERIFERICOS,
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
            category: item_entity_1.ItemCategory.PAPELERIA,
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
            category: item_entity_1.ItemCategory.HARDWARE,
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
            category: item_entity_1.ItemCategory.PERIFERICOS,
            stock: 1,
            unitPrice: 89.99,
            criticalLimit: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    create(createItemDto) {
        return 'This action adds a new item';
    }
    findAll() {
        return this.mockItems;
    }
    findOne(id) {
        return `This action returns a #${id} item`;
    }
    update(id, updateItemDto) {
        return `This action updates a #${id} item`;
    }
    remove(id) {
        return `This action removes a #${id} item`;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)()
], ItemsService);
//# sourceMappingURL=items.service.js.map