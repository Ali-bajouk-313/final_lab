import {ChangeDetectionStrategy, Component, inject,signal } from '@angular/core';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {LucideAngularModule, Heart, ShoppingCart,Star} from 'lucide-angular';
import { FavoriteServices } from '../../shared/services/favorite-services/favorite-services';

@Component({
  selector: 'app-favorite',
  imports: [LucideAngularModule],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
})
export class Favorite {
  product!:IProduct;
  private favoriteService=inject(FavoriteServices);
  favorites=this.favoriteService.favorite;
  constructor(){}
  remove(id:number){
    this.favoriteService.removeFromfavorite(id);
  }
  clear(){
    this.favoriteService.clearfavorite();
  }
}
