import { Injectable, inject, signal,PLATFORM_ID } from '@angular/core';
import { ICart } from '../../interface/product.interface';
import { IProduct } from '../../interface/product.interface';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart=signal<ICart[]>([]);
  private platformId = inject(PLATFORM_ID);
  constructor(
    private auth:AuthService
  ){
    if(isPlatformBrowser(this.platformId)){
      const key=this.getCartKey();
      if(key){
        const savedCart=localStorage.getItem('cart');
          if(savedCart){
          this.cart.set(JSON.parse(savedCart))
          }
        }
      }
  }
  private getCartKey(){

  const user = this.auth.getuser();

  return user ?`cart_${user.id}`: null;

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
      const key = this.getCartKey();
      if(key){
        localStorage.setItem(
          key,
          JSON.stringify(this.cart())
        );
      }
    }
  }
  updateCart(cart:any[]){
    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
  }

}
