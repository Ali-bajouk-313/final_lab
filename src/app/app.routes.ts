import { Routes } from '@angular/router';
import { Login}  from './pages/login/login'
import { Register}  from './pages/register/register'
import { Home } from './pages/home/home'
import { Profile } from './pages/profile/profile'

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
    }
];
