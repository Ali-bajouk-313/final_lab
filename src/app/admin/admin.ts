import { Router,RouterOutlet,RouterLink,NavigationEnd  } from '@angular/router';
import {Component,inject,signal} from '@angular/core'
import { AuthService } from '../core/auth/auth.service';
import { filter } from 'rxjs';
@Component({
  selector:'app-admin',
  standalone:true,
  imports:[RouterOutlet,RouterLink],
  templateUrl:'./admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  private auth = inject(AuthService);
  private router = inject(Router);
  activeLabel = 'overview';
  user = this.auth.currentuser;
  
  navItems=[{
    id:'overview',
    label:'Overview',
    icon:'fa-solid fa-chart-column',
    route:'/admin/dashboard'

  },
  {
    id:'products',
    label:'Products',
    icon: 'fa-solid fa-box',
    route:'/admin/products'
  },
  {
    id:'orders',
    label:'Orders',
    icon: 'fa-solid fa-bag-shopping',
    route:'/admin/orders'
  },
  {
    id:'users',
    label:'Users',
    icon: 'fa-solid fa-users',
    route:'/admin/users'
  },
  {
    id: 'carts',
    label: 'Cart Management',
    icon: 'fa-solid fa-cart-shopping',
    route:'/admin/carts'
  }
];

constructor(
){
   this.auth.getCurrentUser()
      .subscribe({
        next:(user)=>{
          console.log("Current user:", user);
        },
        error:(err)=>{
          console.log("User error:", err);
        }
      });
      this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event:any)=>{

      const route = event.urlAfterRedirects;

      const item = this.navItems.find(
        item => route.includes(item.route)
      );

      if(item){
        this.activeLabel = item.label;
      }

    });    
}
logout(){
  this.auth.logout();
}

}