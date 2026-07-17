import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interface/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  private api =
    'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.api);

  }

  getProduct(id:number):Observable<Product>{

    return this.http.get<Product>(`${this.api}/${id}`);

  }

}