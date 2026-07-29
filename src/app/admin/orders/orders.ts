import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector:'app-orders',
  standalone:true,
  templateUrl:'./orders.html',
  styleUrl:'./orders.css'
})
export class Orders {


  private auth = inject(AuthService);


  usersWithOrders:any[] = [];


  ngOnInit(){

    const users = this.auth.getallUSers();


    this.usersWithOrders = users.filter((user:any)=>
      user.orders && user.orders.length > 0
    );


    console.log(
      "Users with orders:",
      this.usersWithOrders
    );

  }

}