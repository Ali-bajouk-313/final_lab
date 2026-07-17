import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../shared/interface/user.interface';
import { catchError, Observable } from 'rxjs';
import {signal} from'@angular/core';

interface LoginResponse{
  token:string;
  user:IUser
}
interface RegisterResponse{
   token:string;
    user:IUser 
}
@Injectable({
  providedIn:'root',
})
export class AuthService{


  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieservice: CookieService,
    // private errorhandler:ErrorHandlerService
  ){
  if(this.gettoken()){

    this.isLoggedIn.set(true);

  }
  }

  tokenkey='token';
  currentuser=signal<IUser | null>(null) ;
  isLoggedIn = signal(false);

  private BaseUrl ='http://localhost:4000/api';
  gettoken(): string{
    return this.cookieservice.get(this.tokenkey);
  }
  settoken(token:string):void{
    this.cookieservice.set(this.tokenkey,token,{path:'/',expires:7});
    this.isLoggedIn.set(true);
  }
  

  login(email:string,password:string):Observable<LoginResponse>{
   return this.http.post<LoginResponse>(
      `${this.BaseUrl}/auth/login`,
      {
        email,
        password
      }
    );
    
  }
  removeToken(){

    this.cookieservice.delete(this.tokenkey);

    this.isLoggedIn.set(false);

  }
  isAuthenticated(): boolean {

    return this.isLoggedIn();

  }
  register(payload:{username:string,email:string,password:string,firstName:string;lastName:string;dateOfBirth:string;role:string;}){
    return this.http.post<RegisterResponse>(
      `${this.BaseUrl}/auth/register`,
      payload
    );
  }
  logout(){

  this.cookieservice.delete(this.tokenkey);

  this.currentuser.set(null);

  this.isLoggedIn.set(false);

  this.router.navigate(['/login']);

  }
  setuser(user:IUser){
    this.currentuser.set(user);
  }
  getuser(){
    return this.currentuser;
  }
  getCurrentUser(){

  return this.http.get<IUser>(
    `${this.BaseUrl}/auth/user`
  );

}

}