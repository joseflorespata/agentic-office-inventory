import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { CreateTransactionDto } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/items';

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  createTransaction(
    itemId: number,
    dto: CreateTransactionDto
  ): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/${itemId}/transaction`, dto);
  }
}
