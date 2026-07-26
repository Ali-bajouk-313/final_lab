import { Component, signal } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { LucideAngularModule, Heart, ShoppingCart, Star } from 'lucide-angular';
import { IProduct } from '../../../../shared/interface/product.interface';
import { ProductService } from '../../../../shared/services/products-services/products.service';
import { CartService } from '../../../../shared/services/cart-services/cart-services';
import { AuthService } from '../../../../core/auth/auth.service';
import { FavoriteServices } from '../../../../shared/services/favorite-services/favorite-services';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  products = signal<IProduct[]>([]);  product!: IProduct;

  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;

  stars = [1,2,3,4,5];



  constructor(
    private productService: ProductService,
    private auth:AuthService,
    private Cart:CartService,
    private router:Router,
    private Favorite:FavoriteServices
  ){}



  ngOnInit(){

    this.productService.getProducts()
    .subscribe({

      next:(data:IProduct[])=>{

        this.products.set(data);
        console.log("Products:",data);
      },

      error:(error)=>{

        console.log(error);

      }

    })

  }



  filledStars(product:IProduct){

    return Math.floor(product.rating.rate);

  }

  toggleFavorite(product:IProduct){

    if(!this.auth.isAuthenticated()){

      this.router.navigate(['/login']);

      return;

    }
    this.Favorite.toggleFavorite(product);
    alert("Product added to favorite")
  }

  isFavorite(id:number){

    return this.Favorite.isFavorite(id)
  }


  addToCart(product:IProduct){
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return;
    }
    this.Cart.addToCart(product);
    console.log('product added');
    alert('product added')
  }

}