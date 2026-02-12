import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService } from './services/items.service';
import { NotificationService } from './services/notification.service';
import { ToastComponent } from './components/toast/toast.component';
import { Item } from './models/item.model';
import {
  TransactionType,
  CreateTransactionDto,
} from './models/transaction.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private itemsService = inject(ItemsService);
  private notificationService = inject(NotificationService);

  // Signals para reactividad
  items = signal<Item[]>([]);
  selectedItem = signal<Item | null>(null);
  showModal = signal<boolean>(false);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals
  totalItems = computed(() => this.items().length);
  lowStockItems = computed(() =>
    this.items().filter((item) => item.stock <= item.criticalLimit)
  );
  totalValue = computed(() =>
    this.items().reduce((sum, item) => sum + item.stock * item.unitPrice, 0)
  );

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

        // Mostrar notificación de éxito
        const transactionTypeText =
          dto.type === TransactionType.ENTRADA ? 'entrada' : 'salida';
        this.notificationService.success(
          'Transacción exitosa',
          `${transactionTypeText} de ${dto.quantity} unidades registrada. Nuevo stock: ${updatedItem.stock}`
        );

        // Alerta si el stock queda crítico
        if (
          updatedItem.stock <= updatedItem.criticalLimit &&
          dto.type === TransactionType.SALIDA
        ) {
          this.notificationService.warning(
            'Stock crítico',
            `${updatedItem.name} ha alcanzado el límite crítico. Stock actual: ${updatedItem.stock}`
          );
        }

        this.closeModal();
        this.loading.set(false);
      },
      error: (err) => {
        this.notificationService.error(
          'Error en la transacción',
          err.error?.message || 'No se pudo procesar la transacción'
        );
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
      Hardware: 'bg-blue-100 text-blue-700',
      Papelería: 'bg-emerald-100 text-emerald-700',
      Periféricos: 'bg-purple-100 text-purple-700',
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  }

  getCategoryGradient(category: string): string {
    const gradients: { [key: string]: string } = {
      Hardware: 'bg-gradient-to-r from-blue-50 to-blue-100',
      Papelería: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
      Periféricos: 'bg-gradient-to-r from-purple-50 to-purple-100',
    };
    return gradients[category] || 'bg-gradient-to-r from-slate-50 to-slate-100';
  }

  getCategoryIconBg(category: string): string {
    const backgrounds: { [key: string]: string } = {
      Hardware: 'bg-blue-500',
      Papelería: 'bg-emerald-500',
      Periféricos: 'bg-purple-500',
    };
    return backgrounds[category] || 'bg-slate-500';
  }

  getCategoryBadge(category: string): string {
    const badges: { [key: string]: string } = {
      Hardware: 'badge-primary',
      Papelería: 'badge-success',
      Periféricos: 'badge-secondary',
    };
    return badges[category] || 'badge-neutral';
  }
}
