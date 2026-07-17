import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/products-services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-prodcut-detail',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './prodcut-detail.html',
  styleUrl: './prodcut-detail.css',
})
export class ProdcutDetail implements OnInit {

  product!: IProduct;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(){

    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log("Product ID:", id);

    this.productService.getProduct(id)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.product = data;
        },
        error:(err)=>{
          console.log(err);
        }
      });

  }

}