import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductInfo } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _todo = new BehaviorSubject<any[]>([]);
  readonly todos$ = this._todo.asObservable();
  private todos: any[] = [];

  constructor(public httpClient: HttpClient) {}

  /**
   * This service used to get all product list
   */
  getAllProduct(): Observable<ProductInfo[]> {
    return this.httpClient.get<ProductInfo[]>('/assets/product.json');
  }

  /**
   * This service creates checkout product list
   * @returns void
   */
  create(item: ProductInfo): void {
    this.todos.push(item);
    this._todo.next(Object.assign([], this.todos));
  }

  /**
   * This service remove product from checkout product list
   * @returns void
   */
  remove(id: number) {
    this.todos = this.todos.filter((data) => data.id != id);
    this._todo.next(Object.assign([], this.todos));
  }
}
