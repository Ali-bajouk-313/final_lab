import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/products-services/products.service';

@Component({
  selector: 'app-favorite',
  imports: [],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
})
export class Favorite {
  favorites;

  constructor(private productService: ProductService){
    this.favorites=this.productService.getFavorites();
  }

}
