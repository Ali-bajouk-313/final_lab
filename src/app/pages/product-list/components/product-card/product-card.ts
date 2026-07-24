import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { LucideAngularModule, Heart, ShoppingCart, Star } from 'lucide-angular';
import { IProduct } from '../../../../shared/interface/product.interface';
import { ProductService } from '../../../../shared/services/products-services/products.service';
import { CartService } from '../../../../shared/services/cart-services/cart-services';
import { AuthService } from '../../../../core/auth/auth.service';
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

  favoriteProducts = signal<Set<number>>(new Set());


  constructor(
    private productService: ProductService,
    private auth:AuthService,
    private Cart:CartService,
    private router:Router
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



  toggleFavorite(productId:number){

    this.favoriteProducts.update(favorites=>{

      const updated = new Set(favorites);


      if(updated.has(productId)){

        updated.delete(productId);

      }
      else{

        updated.add(productId);

      }


      return updated;

    })

  }



  isFavorite(productId:number){

    return this.favoriteProducts()
    .has(productId);

  }



  favorite(product:IProduct){

    this.productService.addToFavorite(product);

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