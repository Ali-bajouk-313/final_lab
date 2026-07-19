import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Heart, ShoppingCart, Star } from 'lucide-angular';
import { IProduct } from '../../interface/product.interface';
import { ProductService } from '../../products-services/products.service';
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  products: IProduct[] = [];

  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;

  stars = [1, 2, 3, 4, 5];

  favoriteProducts = signal<Set<number>>(new Set());

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {

    this.productService.getProducts()
      .subscribe({

        next: (data: IProduct[]) => {

          this.products = data;

        },

        error: (error) => {

          console.log("Error loading products:", error);

        }

      });

  }

  filledStars(product: IProduct) {

    return Math.floor(product.rating.rate);

  }

  toggleFavorite(productId: number) {

  this.favoriteProducts.update(favorites => {

    const updated = new Set(favorites);

    if(updated.has(productId)){

      updated.delete(productId);

    }
    else {
      updated.add(productId);

    }
    return updated;

  });

}
  isFavorite(productId:number){

    return this.favoriteProducts().has(productId);

  }

}