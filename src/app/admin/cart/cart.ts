import { Component,inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private auth = inject(AuthService);


userscart:any[]=[];


ngOnInit(){

  const users=this.auth.getallUSers();
  this.userscart=users.filter((user:any)=>{
    const cart=JSON.parse(localStorage.getItem(`cart_${user.id}`) || '[]');
    return cart.length>0;
  }).map((user:any)=>{
    return{
      ...user,
      cart:JSON.parse(
          localStorage.getItem(`cart_${user.id}`) || '[]'
      )
    };
  });
  console.log(this.userscart)
 }
}
