import { Routes } from '@angular/router';
import { Login}  from './pages/login/login'
import { Register}  from './pages/register/register'
import { Home } from './pages/home/home'
import { Profile } from './pages/profile/profile'
import { Products } from './pages/product-list/product-list';
import { ProdcutDetail } from './pages/prodcut-detail/prodcut-detail';
import {About} from './pages/about/about'

export const routes: Routes = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    //loadcomponents
    {
        path:"home",
        component:Home
    },
        //loadcomponents

    {
        path:"login",
        component:Login
    },
        //loadcomponents

    {
        path:"register",
        component:Register
    },
        // loadcomponents lazyloading
        // onpush
        // ng intiate destroy
        // validators
    {
        path:"profile",
        component:Profile
    },
    {
        path:"shop",
        component:Products
    },
    {
        path:"shop/:id",
        component:ProdcutDetail
    },
    {
        path:"About",
        component:About
    }
];
//use AG grid