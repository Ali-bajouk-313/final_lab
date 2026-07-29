import { Component, inject, signal,effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../shared/services/cart-services/cart-services';
import { Check, Shield } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { ICart } from '../../shared/interface/product.interface';
import { error } from 'node:console';
@Component({
  selector: 'app-checkout',
  standalone:true,
  imports:[
    FormsModule,
    LucideAngularModule
  ],
  templateUrl:'./checkout.html',
  styleUrl:'./checkout.css',
  
})
export class Checkout {
errorMessage = signal('');
  
validateForm(){

  const ship = this.shipping();
  const pay = this.payment();
    if(!ship.username ||
      !ship.email ||
      !ship.phone ||
      !ship.address ||
      !ship.city ||
      !ship.country){

      this.errorMessage.set(
        'Go Back and fill all shipping information'
      );

      return false;
    }


    if(!pay.cardName ||
      !pay.cardNumber ||
      !pay.expiry ||
      !pay.cvv){

      this.errorMessage.set(
        'Go Back and fill all payment information'
      );

      return false;
    }


    this.errorMessage.set('');

    return true;

  }
  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  step = signal(1);
  placed = signal(false);

  Check = Check;
  Shield = Shield;
  carts = signal<ICart[]>([]);
  shipping = signal({

    username:'',
    email:'',
    phone:'',
    address:'',
    city:'',
    state:'',
    zip:'',
    country:''
  });
  payment = signal({
    cardName:'',
    cardNumber:'',
    expiry:'',
    cvv:''
  });

  constructor() {
    effect(() => {
      console.log('Checkout cart:', this.cart.cart());
    });
  }
    ngOnInit(){
      this.carts.set(this.cart.cart());
      const user = this.auth.getuser();
      if(user){
      this.shipping.set({
      username:user.username,
      email:user.email,
      phone:user.addresses?.[0]?.phone ,
      address:user.addresses?.[0]?.street ,
      city:user.addresses?.[0]?.city ,
      state:'',
      zip:'',
      country:user.addresses?.[0]?.country 

      });


      }


    }

    updateShipping(
    key:string,
    value:string
    ){

    this.shipping.update(data=>({

    ...data,

    [key]:value

    }));

    }

    updatePayment(
    key:string,
    value:string
    ){

    this.payment.update(data=>({

    ...data,

    [key]:value

    }));

    }

    subtotal(){

    return this.carts()
    .reduce(
    (total,item)=>
    total+(item.price*item.quantity),

    0

    );

    }

    shippingCost(){
    return this.subtotal() >= 50 ? 0 : 9.99;
    }
    total(){
    return this.subtotal()+this.shippingCost();
    }

    nextStep(){

    this.step.update(x=>x+1);

    }

    previousStep(){

    this.step.update(x=>x-1);

    }

    placeOrder(){

    if(!this.validateForm()){
      return;
    }


    const user = this.auth.getuser();

    if(!user){
      return;
    }


    const order = {
      id: Date.now(),
      date: new Date().toISOString(),

      items: this.carts().map(item => ({
        productId: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      })),

      shipping: this.shipping(),

      payment: {
        cardName: this.payment().cardName,
        cardNumber: this.payment().cardNumber.slice(-4),
      },

      total: this.total(),

      status: 'pending'
    };


    if(!user.orders){
      user.orders = [];
    }


    user.orders.push(order);


    this.auth.updateUser(user);
    console.log('order',order)

    this.cart.clearCart();


    this.placed.set(true);

  }
    home(){

    this.router.navigate(['/']);

    }

}