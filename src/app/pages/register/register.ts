import { Component } from '@angular/core';
import { Button } from '../../shared/components/buttons/buttons'
import { Input } from '../../shared/components/input/input'
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone:true,
  imports: [Button,Input],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  username='';
  email='';
  password='';

  constructor(
    private auth:AuthService,
    private router:Router
  ){}  
  
  register(){
    alert("Register clicked");
    
    const user={

    username:this.username,
    email:this.email,
    password:this.password,
    firstName:this.username || "user",
    lastName: "User",
    dateOfBirth: "2000-01-01",
    role: "user"

    };

    console.log("PAYLOAD SENT:", user);
    this.auth.register(user).subscribe({
    next:(res)=>{
    console.log("register is successful");
    this.auth.settoken(res.token);
    this.auth.setuser(res.user);
    
  this.router.navigate(["/home"])
  .then(success => {
    console.log("Navigation success:", success);
  })
  .catch(error => {
    console.log("Navigation error:", error);
  });

},
error: (err) => {

  if (err.status === 409) {

    switch (err.error?.message) {

      case 'Email Taken':
        alert('This email is already registered.');
        break;

      case 'Username Taken':
        alert('This username is already taken.');
        break;

      default:
        alert(err.error?.message || 'Conflict occurred.');
    }

    return;
  }

  if (err.status === 400) {
    alert(err.error?.errors?.join('\n'));
    return;
  }

  alert('Something went wrong. Please try again.');
}
});
  }
}
