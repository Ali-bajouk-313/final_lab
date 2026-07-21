import {ChangeDetectionStrategy, Component, OnInit,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';

@Component({
  selector: 'app-prodcut-detail',
  standalone:true,
  imports: [RouterLink,LucideAngularModule],
  templateUrl: './prodcut-detail.html',
  styleUrl: './prodcut-detail.css',
})

export class ProdcutDetail implements OnInit {

  product!: IProduct;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  Heart = Heart;
  ShoppingCart = ShoppingCart;
  Star = Star;
  isFavorite = signal(false);

  toggleFavorite() {
    this.isFavorite.update(value => !value);
  }
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
  filledStars() {
    return Math.round(this.product.rating.rate);
  }
  stars = [1,2,3,4,5];

}