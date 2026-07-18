import { ChangeDetectionStrategy, Component, RESPONSE_INIT } from '@angular/core';
import {Button} from "../../shared/components/buttons/buttons";
import { Input } from "../../shared/components/input/input";
import { AuthService } from '../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder,FormGroup, Validator, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  changeDetection:ChangeDetectionStrategy.OnPush, 
  selector: 'app-login',
  standalone:true,
  imports: [Button, Input,ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginform!:FormGroup;

   constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router:Router

  ){}
  ngOnInit(): void{
      this.loginform=this.fb.group({

    email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],


    password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
  })
}

  login(){
    console.log(this.loginform.value);

      if (this.loginform.invalid) {

      this.loginform.markAllAsTouched();

      alert("Forn Invalid");

      return;

    }
    const data = this.loginform.value;
    console.log("clicked")
    
    this.auth.login(
      data.email,
      data.password
    ).subscribe({
      next:(response)=>{
        this.auth.setuser(response.user)
        this.auth.settoken(response.token);
        this.router.navigate(['/home']);
        console.log("USer from login", response.user)
      },
      error:(err)=>{
      console.log("REGISTER ERROR", err);
      console.log("STATUS:", err.status);
      console.log("ERROR BODY:", err.error);
      console.log("DETAILS:", err.error?.errors);
        if (err.status === 404) {
        alert('Account not found.');
        return;
      }

      if (err.status === 401) {
        alert('Invalid email or password.');
        return;
      }

      alert(err.error?.message ?? 'Login failed.');
      }
    })
    

  }
}
