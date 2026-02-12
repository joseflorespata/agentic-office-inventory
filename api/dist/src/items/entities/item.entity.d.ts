export declare enum ItemCategory {
    HARDWARE = "Hardware",
    PAPELERIA = "Papeler\u00EDa",
    PERIFERICOS = "Perif\u00E9ricos"
}
export declare class Item {
    id: number;
    name: string;
    description: string;
    category: ItemCategory;
    stock: number;
    unitPrice: number;
    criticalLimit: number;
    createdAt: Date;
    updatedAt: Date;
}
