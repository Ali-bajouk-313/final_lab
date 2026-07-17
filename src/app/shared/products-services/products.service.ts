import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interface/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private api =
    'https://fakestoreapi.com/products';

  getProducts(): Observable<IProduct[]> {

    return this.http.get<IProduct[]>(this.api);

  }

  getProduct(id:number):Observable<IProduct>{

    return this.http.get<IProduct>(`${this.api}/${id}`);

  }

}