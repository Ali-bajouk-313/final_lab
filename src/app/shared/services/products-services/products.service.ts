import { Injectable, inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../interface/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  favoriteProducts = signal<IProduct[]>([]);

  private api =
    'https://fakestoreapi.com/products';
  
  products=signal<IProduct[]>([]);

  constructor(
    private http:HttpClient
  ){}
  
  getProducts(): Observable<IProduct[]> {
    if (this.products().length > 0) {
    return new Observable(observer => {
      observer.next(this.products());
      observer.complete();
    });
  }
  return this.http.get<IProduct[]>(this.api);
  }
  getProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.api}/${id}`);
  }
  
  addToFavorite(product: IProduct) {
    this.favoriteProducts.update(products => {
      if (products.some(p => p.id === product.id)) {
        return products;
      }

      return [...products, product];
    });
  }

  removeFromFavorite(id: number) {
    this.favoriteProducts.update(products =>
      products.filter(p => p.id !== id)
    );
  }

  getFavorites() {
    return this.favoriteProducts;
  }
  loadProducts(){

  if(this.products().length > 0){
    return;
  }

  this.http.get<IProduct[]>(this.api)
    .subscribe({

      next:(products)=>{

        this.products.set(products);

      },

      error:(err)=>{

        console.log(err);

      }

    });

}
  addProduct(product:IProduct):Observable<IProduct>{
    return this.http.post<IProduct>(this.api,product);
  }
  updateProduct(product:IProduct):Observable<IProduct>{
    return this.http.put<IProduct>(this.api,product);
  } 
  deleteProduct(id:number):Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.api}/${id}`);
  } 
  
}