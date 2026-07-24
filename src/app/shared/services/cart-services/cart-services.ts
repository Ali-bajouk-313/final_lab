import { Injectable, inject, signal,PLATFORM_ID } from '@angular/core';
import { ICart } from '../../interface/product.interface';
import { IProduct } from '../../interface/product.interface';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart=signal<ICart[]>([]);
  private platformId = inject(PLATFORM_ID);

  constructor(){
    if(isPlatformBrowser(this.platformId)){

    const savedCart=localStorage.getItem('cart');

        if(savedCart){
        this.cart.set(JSON.parse(savedCart))
        }
    }
  }
  addToCart(Product:IProduct){
    const exists=this.cart().find(item=>item.id ===Product.id);
    if(exists){
      exists.quantity++;
      this.cart.set([
        ...this.cart()
      ]);
    }
    else{
      this.cart.update(items=>[
        ...items,{
          ...Product,
          quantity:1
        }
      ]);
    }
    this.save();
  }
  removeFromCart(id:number){
    this.cart.update(items =>
      items.filter(item=>item.id !== id)
    );
    this.save();
  }

  clearCart(){
    this.cart.set([]);
    this.save();
  }

  private save(){
    if(isPlatformBrowser(this.platformId)){
            localStorage.setItem(
                'cart',
                JSON.stringify(this.cart())
            );
        }
    }

}