import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';


@Component({
selector:'app-profile',
standalone:true,
templateUrl:'./profile.html',
styleUrl:'./profile.css'
})


export class Profile{


  user:any;


  constructor(
    private auth:AuthService,
    private router:Router
  ){
   this.user=this.auth.getuser();
   console.log("good");
   console.log(this.user);
  }

  logout(){

    this.auth.logout();

    this.router.navigate(['/login']);

  }


}