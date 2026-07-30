import {ChangeDetectionStrategy, Component ,inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import { LucideAngularModule, Search, Heart, ShoppingCart, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import {Button} from '../buttons/buttons';
import {Input} from '../input/input';
import { AuthService } from '../../../core/auth/auth.service';
import {Router} from '@angular/router'
import { CartService } from '../../services/cart-services/cart-services';
import { FavoriteServices } from '../../services/favorite-services/favorite-services';
@Component({
  changeDetection:ChangeDetectionStrategy.OnPush, 
  selector: 'app-navbar',
  standalone: true,
  imports: [Input ,Button,LucideAngularModule, RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  Search = Search;
  menuOpen = false;
  Heart = Heart;
  ShoppingCart = ShoppingCart;
  User = User;
  categories = [
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
    "Kids"
  ];
  private Cart=inject(CartService);
  private Favorite=inject(FavoriteServices);
  private auth=inject(AuthService);
  private router=inject(Router)
  constructor(){}

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }
  hascartitems=this.Cart.hasitems;
  hasfavoriteitems=this.Favorite.hasitems;
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
    
  }
}
