import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ProductService } from '../../shared/services/products-services/products.service';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  templateUrl:'./dashboared.html',
  styleUrl:'./dashboared.css'
})
export class Dashboared {


  private auth = inject(AuthService);
  private productService = inject(ProductService);


  users = this.auth.getUsers();

  products = this.productService.products;


  totalUsers = signal(0);
  totalProducts = signal(0);
  totalOrders = signal(0);
  totalRevenue = signal(0);
  usersWithCart = signal(0);
  pendingOrders = signal(0);



  constructor(){

    this.calculateStats();

  }



  calculateStats(){


    const users = this.users();


    this.totalUsers.set(
      users.filter(user=>user.role==='user').length
    );


    this.productService.getProducts().subscribe(products => {
    this.totalProducts.set(products.length);
    console.log(this.totalProducts());
    });
    let orders = 0;
    let revenue = 0;
    let pending = 0;


    users.forEach(user=>{


      if(user.orders){


        orders += user.orders.length;


        user.orders.forEach(order=>{


          revenue += order.total;


          if(order.status === 'pending'){
            pending++;
          }


        });


      }


    });



    this.totalOrders.set(orders);

    this.totalRevenue.set(revenue);

    this.pendingOrders.set(pending);
  }


}