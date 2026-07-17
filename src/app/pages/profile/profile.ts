import { Component, Signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import {IUser} from '../../shared/interface/user.interface'
import {signal} from'@angular/core';

@Component({
selector:'app-profile',
standalone:true,
templateUrl:'./profile.html',
styleUrl:'./profile.css'
})


export class Profile{


  user=signal<IUser | null>(null) ;


  constructor(
    private auth:AuthService,
    private router:Router
  ){
   this.user=this.auth.getuser();
   console.log("good");
  }

  logout(){

    this.auth.logout();

    this.router.navigate(['/login']);

  }


}