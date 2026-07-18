import { ChangeDetectionStrategy,Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProduct } from '../../../../shared/interface/product.interface';
import { ProductService } from '../../../../shared/products-services/products.service';

@Component({
  selector: 'app-product-card',
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
   products: IProduct[] = [];
  
  
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
}
