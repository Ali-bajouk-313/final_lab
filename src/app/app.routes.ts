import { Routes } from '@angular/router';
import { adminGuard } from './admin/core/adminguards/adminguards';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { authGuard } from './core/auth/auth.guard';
export const routes: Routes = [
    
    {
        path:'',
        component:MainLayout,
        children:[
            {
                path:"",
                loadComponent:()=> import('./pages/home/home').then(m=>m.Home)
            },
            {
                path:"profile",
                canActivate:[authGuard],
                loadComponent:()=>import('./pages/profile/profile').then(m=>m.Profile)
            },
            {
                path:"shop",
                loadComponent:()=>import('./pages/product-list/product-list').then(m=>m.Products)
            },
            {
                path:"shop/:id",
                loadComponent:()=>import('./pages/prodcut-detail/prodcut-detail').then(m=>m.ProdcutDetail)
            },
            {
                path:"About",
                loadComponent:()=>import('./pages/about/about').then(m=>m.About)
            },
            {
                path:"favorite",
                canActivate:[authGuard],
                loadComponent:()=>import('./pages/favorite/favorite').then(m=>m.Favorite)
            },
            {
                path:"cart",
                canActivate:[authGuard],
                loadComponent:()=>import('./pages/cart/cart').then(m=>m.Cart)
            },
        ]
    },
    {
        path:'',
        component:AuthLayout,
        children:[
            {
                path:"login",
                loadComponent:()=> import('./pages/login/login').then(m=>m.Login)
            },
            {
                path:"register",
                loadComponent:()=>import('./pages/register/register').then(m=>m.Register)
            },
        ]
    },
    {
        path:"admin",
        loadComponent:()=>import('./admin/admin').then(m=>m.Admin),
        canActivate:[adminGuard],
        children:[
            {
            path:'',
            redirectTo:"dashboard",
            pathMatch:"full"
            },
            {
            path:'dashboard',
            loadComponent:()=>import('./admin/dashboared/dashboared').then(m=>m.Dashboared)
            },
            {
            path: 'products',
            loadComponent: () =>
                import('./admin/products/products').then(m => m.Products)
            },
            {
            path: 'users',
            loadComponent: () =>
                import('./admin/users/users').then(m => m.Users)
            },
            {
            path: 'orders',
            loadComponent: () =>
                import('./admin/orders/orders').then(m => m.Orders)
            },
            {
            path: 'carts',
            loadComponent: () =>
                import('./admin/cart/cart').then(m => m.Cart)
            }
        ]
    }
];
// use AG grid
// Dont forget to add the footer and the about page and merge them 
// detect errors in interceptors
// change product card place
// localstorage for favorites and add to cart
// for statics testing pretier eslint
// techniques for testing TDD and TLD
// use before each test
// onpush
// ng intiate destroy
// validators
// ng models replacements
//Rxjs to store data
