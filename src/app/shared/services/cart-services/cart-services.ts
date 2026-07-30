import { Injectable, inject, signal,PLATFORM_ID,computed } from '@angular/core';
import { ICart } from '../../interface/product.interface';
import { IProduct } from '../../interface/product.interface';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart=signal<ICart[]>([]);
  hasitems=computed(()=>this.cart().length)
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

  this.cart.update(items => {

    const exists = items.find(
      item => item.id === Product.id
    );


    if(exists){

      return items.map(item =>
        item.id === Product.id
        ?
        {
          ...item,
          quantity:item.quantity + 1
        }
        :
        item
      );

    }


    return [
      ...items,
      {
        ...Product,
        quantity:1
      }
    ];

  });


  setTimeout(()=>{
    this.save();
  });

  }
  removeFromCart(id:number){
    this.cart.update(items =>
      items.filter(item=>item.id !== id)
    );
    this.save();
  }

  clearCart(){
    console.log('clearCart called');
    console.trace();

    this.cart.set([]);
    this.save();
  }
  getCart(){
    return this.cart;
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
