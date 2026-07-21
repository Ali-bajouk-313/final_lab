import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from './components/product-card/product-card';


@Component({
  selector: 'app-products',
  standalone: true,
  imports:[
    FormsModule,
    ProductCard
  ],
  templateUrl:'./product-list.html',
  styleUrl:'./product-list.css'
})
export class Products {


  search = '';

  selectedCategory = 'All Products';

  sortBy = 'Default';

  minPrice = 7;

  maxPrice = 1000;


  categories = [
    {
      name:'All Products',
      count:34
    },
    {
      name:'Electronics',
      count:6
    },
    {
      name:'Jewellery',
      count:4
    },
    {
      name:"Men's Clothing",
      count:8
    },
    {
      name:"Women's Clothing",
      count:10
    },
    {
      name:"Kids",
      count:6
    }
  ];



  ratings = [
    {
      label:'All ratings',
      value:0
    },
    {
      label:'4+ stars',
      value:4
    },
    {
      label:'3+ stars',
      value:3
    },
    {
      label:'2+ stars',
      value:2
    },
  ];



}