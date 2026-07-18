import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  LucideAngularModule,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-angular';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {


  socialIcons = [
    Facebook,
    Instagram,
    Twitter,
    Youtube
  ];


  quickLinks = [
    {
      name:"home",
      path:"/"
    },
    {
      name:"shop",
      path:"/shop"
    },
    {
      name:"about",
      path:"/about"
    },
    {
      name:"wishlist",
      path:"/wishlist"
    }
  ];



  categories = [
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
    "Kids"
  ];



  contact = [
    {
      icon: MapPin,
      text:"123 Fashion Ave, New York, NY 10001"
    },
    {
      icon: Phone,
      text:"+1 (555) 234-5678"
    },
    {
      icon: Mail,
      text:"hello@abfashion.com"
    },
    {
      icon: Clock,
      text:"Mon-Fri, 9am-6pm EST"
    }
  ];

}