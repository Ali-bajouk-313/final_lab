import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { LucideAngularModule, Search, Heart, ShoppingCart, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import {Button} from '../buttons/buttons';
import {Input} from '../input/input';
import { AuthService } from '../../../core/auth/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Input ,Button,LucideAngularModule, RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  Search = Search;
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

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

    get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
    }
    logout(){

    this.auth.logout();
    this.router.navigate(['/login']);
    
  }
}
