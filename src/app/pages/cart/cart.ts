import {Component, inject,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import {Router } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';
import { FavoriteServices } from '../../shared/services/favorite-services/favorite-services';
import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../shared/services/cart-services/cart-services';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [LucideAngularModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart  {

  product!:IProduct;
  private favoriteService=inject(FavoriteServices);
  private auth=inject(AuthService)
  private router=inject(Router);
  private cart=inject(CartService)
  favorites=this.favoriteService.favorite;
  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;
  carts = this.cart.cart;
  stars = [1,2,3,4,5];
  constructor(
  ) {}
  
  remove(id:number){
    this.cart.removeFromCart(id);
  }
  clear(){
    this.cart.clearCart();
  }
  addToCart(product:IProduct){
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return;
    }
    this.cart.addToCart(product);
    console.log('product added');
  }
  filledStars(product:IProduct){

    return Math.floor(product.rating.rate);

  }
  toggleFavorite(product:IProduct){

    if(!this.auth.isAuthenticated()){

      this.router.navigate(['/login']);

      return;

    }
    this.favoriteService.toggleFavorite(product);

  }
  isFavorite(id:number){

    return this.favoriteService.isFavorite(id)
  }

  increaseQuantity(item:any){
    item.quantity++;
    this.cart.updateCart(this.carts());
  }


  decreaseQuantity(item:any){
    if(item.quantity > 1){
        item.quantity--;
        this.cart.updateCart(this.carts());
    }
  }
  subtotal(){

    return this.carts()
    .reduce(
        (total,item)=>
        total + (item.price * item.quantity),
        0
    );
  }
}