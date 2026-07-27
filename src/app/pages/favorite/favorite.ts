import {ChangeDetectionStrategy, Component, inject,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';
import { FavoriteServices } from '../../shared/services/favorite-services/favorite-services';
import { AuthService } from '../../core/auth/auth.service';
import { Cart } from '../../admin/cart/cart';
import { CartService } from '../../shared/services/cart-services/cart-services';
@Component({
  selector: 'app-favorite',
  imports: [LucideAngularModule],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
})
export class Favorite {
  product!:IProduct;
  private favoriteService=inject(FavoriteServices);
  private auth=inject(AuthService)
  private router=inject(Router);
  private cart=inject(CartService)
  favorites=this.favoriteService.favorite;
  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;

  stars = [1,2,3,4,5];
  constructor(
  ){}
  remove(id:number){
    this.favoriteService.removeFromfavorite(id);
  }
  clear(){
    this.favoriteService.clearfavorite();
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
}
