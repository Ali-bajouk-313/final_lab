import { Component,signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import {IUser} from '../../shared/interface/user.interface'
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Products } from '../products/products';
import { Layout } from '../layout/layout';
@Component({
  selector: 'app-dashboared',
  imports: [Products,Layout],
  templateUrl: './dashboared.html',
  styleUrl: './dashboared.css',
})
export class Dashboared {
  users: ReturnType<AuthService['getUsers']>;  
  constructor(
    private auth:AuthService,
    private router:Router
  ){
    this.users=this.auth.getUsers();
    console.log(this.users())
  }  
}
