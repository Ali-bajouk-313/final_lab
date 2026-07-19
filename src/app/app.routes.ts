import { Routes } from '@angular/router';
import { Products } from './pages/product-list/product-list';
import { ProdcutDetail } from './pages/prodcut-detail/prodcut-detail';
import {About} from './pages/about/about'
import { Footer } from './shared/components/footer/footer';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"home",
        loadComponent:()=> import('./pages/home/home').then(m=>m.Home)
    },
    {
        path:"login",
        loadComponent:()=> import('./pages/login/login').then(m=>m.Login)
    },
        //loadcomponents

    {
        path:"register",
        loadComponent:()=>import('./pages/register/register').then(m=>m.Register)
    },
        // onpush
        // ng intiate destroy
        // validators
    {
        path:"profile",
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
        path:"footer",
        loadComponent:()=>import('./shared/components/footer/footer').then(m=>m.Footer)
    },
    {
        path:"favorite",
        loadComponent:()=>import('./pages/favorite/favorite').then(m=>m.Favorite)
    },
    {
        path:"cart",
        loadComponent:()=>import('./pages/cart/cart').then(m=>m.Cart)
    }
];
//use AG grid
// Dont forget to add the footer and the about page and merge them 