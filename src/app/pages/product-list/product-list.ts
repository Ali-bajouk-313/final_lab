import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from './components/product-card/product-card';
import { IProduct } from '../../shared/interface/product.interface';
import { ProductService } from '../../shared/services/products-services/products.service';


@Component({

  selector:'app-products',

  standalone:true,

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

  selectedRating = 0;

  sortBy = 'Default';


  minPrice = 0;

  maxPrice = 1000;



  products:IProduct[]=[];

  filteredProducts:IProduct[]=[];



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
    }

  ];





  constructor(
    private productService:ProductService
  ){}
  ngOnInit(){

  this.productService.getProducts()
  .subscribe({

    next:(data)=>{

      this.products = data;

      this.filteredProducts = [...data]; // show all products initially

    },


    error:(err)=>{

      console.log(err);

    }

  });

}

  applyFilters(){


    let result=[...this.products];



    // SEARCH

    if(this.search.trim()){


      result=result.filter(product=>

        product.title
        .toLowerCase()
        .includes(
          this.search.toLowerCase()
        )

      );

    }


    if(this.selectedCategory !== 'All Products'){


      result=result.filter(product=>

        product.category
        .toLowerCase()
        .includes(
          this.selectedCategory.toLowerCase()
        )

      );


    }






    // PRICE


    result=result.filter(product=>

      product.price >= this.minPrice &&
      product.price <= this.maxPrice

    );







    // RATING


    if(this.selectedRating > 0){


      result=result.filter(product=>

        product.rating.rate >= this.selectedRating

      );


    }







    // SORT


    if(this.sortBy === 'Price Low to High'){


      result.sort((a,b)=>

        a.price-b.price

      );


    }



    else if(this.sortBy === 'Top Rated'){


      result.sort((a,b)=>

        b.rating.rate-a.rating.rate

      );


    }




    this.filteredProducts=result;


  }






  resetFilters(){


    this.search='';

    this.selectedCategory='All Products';

    this.selectedRating=0;

    this.sortBy='Default';

    this.minPrice=0;

    this.maxPrice=1000;


    this.applyFilters();


  }





}