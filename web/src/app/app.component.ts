import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService } from './services/items.service';
import { Item } from './models/item.model';
import {
  TransactionType,
  CreateTransactionDto,
} from './models/transaction.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private itemsService = inject(ItemsService);

  // Signals para reactividad
  items = signal<Item[]>([]);
  selectedItem = signal<Item | null>(null);
  showModal = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Form data
  transactionType = signal<TransactionType>(TransactionType.ENTRADA);
  quantity = signal<number>(1);
  userName = signal<string>('');

  // Enum para el template
  TransactionType = TransactionType;

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    this.error.set(null);
    this.itemsService.getAll().subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los items');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  openTransactionModal(item: Item) {
    this.selectedItem.set(item);
    this.transactionType.set(TransactionType.ENTRADA);
    this.quantity.set(1);
    this.userName.set('');
    this.showModal.set(true);
    this.error.set(null);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedItem.set(null);
    this.error.set(null);
  }

  submitTransaction() {
    const item = this.selectedItem();
    if (!item) return;

    // Validación frontend
    if (
      this.transactionType() === TransactionType.SALIDA &&
      this.quantity() > item.stock
    ) {
      this.error.set(
        `Stock insuficiente. Stock disponible: ${item.stock}`
      );
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const dto: CreateTransactionDto = {
      type: this.transactionType(),
      quantity: this.quantity(),
      user: this.userName() || undefined,
    };

    this.itemsService.createTransaction(item.id, dto).subscribe({
      next: (updatedItem) => {
        // Actualizar el item en la lista usando el signal
        const currentItems = this.items();
        const updatedItems = currentItems.map((i) =>
          i.id === updatedItem.id ? updatedItem : i
        );
        this.items.set(updatedItems);

        this.successMessage.set(
          `Transacción exitosa! Nuevo stock: ${updatedItem.stock}`
        );
        setTimeout(() => this.successMessage.set(null), 3000);

        this.closeModal();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(
          err.error?.message || 'Error al procesar la transacción'
        );
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  isLowStock(item: Item): boolean {
    return item.stock <= item.criticalLimit;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      Hardware: 'bg-blue-100 text-blue-800',
      Papelería: 'bg-green-100 text-green-800',
      Periféricos: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }
}
