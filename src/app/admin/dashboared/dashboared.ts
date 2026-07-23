import { Component,signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboared',
  imports: [],
  templateUrl: './dashboared.html',
  styleUrl: './dashboared.css',
})
export class Dashboared {
  users: ReturnType<AuthService['getUsers']>;  
  constructor(
    private auth:AuthService,
  ){
    this.users=this.auth.getUsers();
    console.log(this.users())
  }  
}
