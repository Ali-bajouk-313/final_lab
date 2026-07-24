import {ChangeDetectionStrategy, Component, inject,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';
import { CartService } from '../../shared/services/cart-services/cart-services';
@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [LucideAngularModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart  {

  product!: IProduct;
  private cartService = inject(CartService);

  carts = this.cartService.cart;
  constructor(
  ) {}
  
  remove(id:number){
    this.cartService.removeFromCart(id);
  }
  clear(){
    this.cartService.clearCart();
  }
}