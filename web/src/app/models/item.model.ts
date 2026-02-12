export enum ItemCategory {
  HARDWARE = 'Hardware',
  PAPELERIA = 'Papelería',
  PERIFERICOS = 'Periféricos',
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  category: ItemCategory;
  stock: number;
  unitPrice: number;
  criticalLimit: number;
  createdAt: Date;
  updatedAt: Date;
}
