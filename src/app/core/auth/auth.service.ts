import { HttpClient } from '@angular/common/http';
import { Component, Injectable,inject,PLATFORM_ID,signal } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../shared/interface/user.interface';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { IAddress } from '../../shared/interface/user.interface';
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
  private platformId = inject(PLATFORM_ID);
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieservice: CookieService,
  ){
   if(isPlatformBrowser(this.platformId)){

    const savedUsers = localStorage.getItem('users');

    if(savedUsers){
      this.users.set(JSON.parse(savedUsers));
    }

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

  isAuthenticated() {

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

  //  updateProfile(payload:{username:string;email:string}){
  //   return this.http.patch<IUser>(
  //     `${this.BaseUrl}/user`,
  //     payload
  //   );
  // }
  
  isAdmin(): boolean {
    const user = this.currentuser();
    return user?.role === "admin";
  }
  getUsers(){
    return this.users.asReadonly();
  }
  addUser(user:IUser){
    this.users.update(users=>[...users,user]);
    this.save();
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(
        'users',
        JSON.stringify(this.users())
      );
    }
  }
  private save(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(
        'users',
        JSON.stringify(this.users())
      );
    }
  }
  updateUser(updatedUser: IUser){
    this.users.update(users =>
      users.map(user =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );
    const current=this.currentuser();
    if(current?.id === updatedUser.id){
      this.currentuser.set(updatedUser)
    }
    this.save()
  }
  addAddress(address:IAddress){
    const user = this.currentuser();
    if(!user) return;
    user.addresses.push(address);
    this.updateUser(user);

  }
  removeAddress(id:number){

  const user = this.currentuser();
  if(!user) return;
    user.addresses =
    user.addresses.filter(
      address => address.id !== id
    );
  this.updateUser(user);
  }
  getAddresses(){
    return this.currentuser()?.addresses ?? [];
  }
  getallUSers():IUser[]{
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  updateOrder(updatedOrder:any){

    const users = this.getallUSers();


    for(const user of users){


      const orderIndex = user.orders?.findIndex(
        (order:any)=> order.id === updatedOrder.id
      );


      if(orderIndex !== -1 && orderIndex !== undefined){


        user.orders[orderIndex] = {
          ...user.orders[orderIndex],
          ...updatedOrder
        };


        break;

      }


    }



    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );


  }
    removeUser(id:number){
    this.users.update(users=>
      users.filter(user=>user.id !==id)
    );
    this.save();
  }
  deleteOrder(orderId:number){

    const users = this.getallUSers();
    users.forEach((user:any)=>{
    if(user.orders){


      user.orders =
      user.orders.filter(
        (order:any)=>order.id !== orderId
      );


      }

    });

      localStorage.setItem(
        'users',
        JSON.stringify(users)
      );
    }
}