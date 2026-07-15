import { ChangeDetectionStrategy, Component, RESPONSE_INIT } from '@angular/core';
import {Button} from "../../shared/components/buttons/buttons";
import { Input } from "../../shared/components/input/input";
import { AuthService } from '../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush, // add this 
  selector: 'app-login',
  standalone:true,
  imports: [Button, Input],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email='';
  password='';
   constructor(
    private auth: AuthService,
    private router:Router

  ){}

  login(){
    console.log("clicked")
    this.auth.login(
    this.email,
    this.password
    ).subscribe({
      next:(response)=>{
        this.auth.setuser(response.user)
        this.auth.settoken(response.token);
        this.router.navigate(['/home']);
        console.log("worked")
      },
      error:(err)=>{
      console.log("REGISTER ERROR", err);
      console.log("STATUS:", err.status);
      console.log("ERROR BODY:", err.error);
      console.log("DETAILS:", err.error?.errors);
      }
    })
    

  }
}
