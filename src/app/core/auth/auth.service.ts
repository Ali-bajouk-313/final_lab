import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../shared/interface/user.interface';
import { catchError, Observable } from 'rxjs';
import {signal} from'@angular/core';
import { tap } from 'rxjs';

interface ILoginResponse{
  token:string;
  user:IUser
}
interface IRegisterResponse{
   token:string;
    user:IUser 
}
@Injectable({
  providedIn:'root',
})
export class AuthService{
  private users=signal<IUser[]>([]);
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieservice: CookieService,
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
    const expired=new Date();
    expired.setHours(expired.getHours()+2);
    
    this.cookieservice.set(this.tokenkey,token,{path:'/',expires:expired});
    this.isLoggedIn.set(true);
  }
  

  login(email:string,password:string):Observable<ILoginResponse>{
   return this.http.post<ILoginResponse>(
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

  register(payload:{username:string;email:string;password:string;firstName:string;lastName:string;dateOfBirth:string;role:string;}){
    return this.http.post<IRegisterResponse>(
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
    return this.currentuser();
  }
  getCurrentUser(){

  return this.http.get<IUser>(
    `${this.BaseUrl}/user`
    ).pipe(
      tap(user => {
        this.currentuser.set(user);
      })
    );
  }
  isAdmin(): boolean {
    const user = this.currentuser();
    return user?.role === "admin";
  }

  getUsers(){
    return this.users.asReadonly();
  }
  addUser(user:IUser){
    this.users.update(users=>[...users,user])
  }
}