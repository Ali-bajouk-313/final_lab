export interface IUser {

id:number;

username:string;

email:string;

password:string;

role:'user'|'admin';

addresses:IAddress[];

orders:IOrder[];

cart:ICartItem[];

wishlist:number[];

}



export interface IAddress {

id:number;

street:string;

city:string;

country:string;

phone:string;

}



export interface IOrder {

id:number;

date:string;

items:ICartItem[];

total:number;

status:string;

}



export interface ICartItem {

productId:number;

title:string;

image:string;

price:number;

quantity:number;

}