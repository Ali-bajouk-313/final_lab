import {Component, OnInit,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';
import { CartService } from '../../shared/services/cart-services/cart-services';
import { AuthService } from '../../core/auth/auth.service';
import { FavoriteServices } from '../../shared/services/favorite-services/favorite-services';
@Component({
  selector: 'app-prodcut-detail',
  standalone:true,
  imports: [RouterLink,LucideAngularModule],
  templateUrl: './prodcut-detail.html',
  styleUrl: './prodcut-detail.css',
})

export class ProdcutDetail implements OnInit {

  product= signal<IProduct | null>(null);

  constructor(
    private auth:AuthService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private Cart:CartService,
    private Favorite:FavoriteServices,
    private router:Router
  ) {}
  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;

  
  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
    const id = Number(params.get('id'));

    console.log("Product ID:", id);

    this.productService.getProduct(id)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.product.set(data);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    });
  }
  toggleFavorite(product:IProduct){

    if(!this.auth.isAuthenticated()){

      this.router.navigate(['/login']);

      return;

    }
    this.Favorite.toggleFavorite(product);
    alert("Product added to favorite");
  }
  
  isFavorite(id:number){

    return this.Favorite.isFavorite(id);

  }
  filledStars() {
    return Math.round(this.product()?.rating.rate ?? 0);
  }
  stars = [1,2,3,4,5];

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