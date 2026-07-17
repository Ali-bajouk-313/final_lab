import { Component } from '@angular/core';
import { ProductService } from '../../shared/products-services/products.service';
import { IProduct } from '../../shared/interface/product.interface';
import {Button} from '../../shared/components/buttons/buttons'
import { ProductCard } from './components/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class Products {


  products: IProduct[] = [];


  constructor(
    private productService: ProductService
  ) {}



  ngOnInit() {

    this.productService.getProducts()
      .subscribe({

        next: (data: IProduct[]) => {

          this.products = data;

          console.log(this.products);

        },


        error: (error) => {

          console.log("Error loading products:", error);

        }


      });


  }


}