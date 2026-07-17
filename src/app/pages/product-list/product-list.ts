import { Component } from '@angular/core';
import { ProductService } from '../../core/products/products.service';
import { Product } from '../../shared/interface/product.interface';
import {Button} from '../../shared/components/buttons/buttons'
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class Products {


  products: Product[] = [];


  constructor(
    private productService: ProductService
  ) {}



  ngOnInit() {

    this.productService.getProducts()
      .subscribe({

        next: (data: Product[]) => {

          this.products = data;

          console.log(this.products);

        },


        error: (error) => {

          console.log("Error loading products:", error);

        }


      });


  }


}