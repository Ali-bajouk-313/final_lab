import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ProductService } from '../../shared/services/products-services/products.service';
import { IProduct } from '../../shared/interface/product.interface';
import { ActionRenderer } from './actions/actions';


@Component({
  selector:'app-products',
  standalone:true,
  imports:[
    AgGridAngular,
    FormsModule
  ],
  templateUrl:'./products.html',
  styleUrl:'./products.css'
})

export class Products {


private productService = inject(ProductService);


products = signal<IProduct[]>([]);


showForm = signal(false);



selectedProduct = signal<IProduct>({

  id:0,

  title:'',

  price:0,

  description:'',

  category:'',

  image:'',

  rating:{
    rate:0,
    count:0
  }

});



constructor(){

  this.loadProducts();

}



loadProducts(){

  this.productService
  .getProducts()
  .subscribe(products=>{

    this.products.set(products);

  });

}



search(event:Event){


const value =
(event.target as HTMLInputElement)
.value
.toLowerCase();



this.productService
.getProducts()
.subscribe(products=>{


this.products.set(

products.filter(product=>

product.title
.toLowerCase()
.includes(value)

)

);


});


}




addProduct(){


this.selectedProduct.set({

id:Date.now(),

title:'',

price:0,

description:'',

category:'',

image:'',

rating:{
 rate:0,
 count:0
}

});


this.showForm.set(true);


}




editProduct(product:IProduct){


this.selectedProduct.set({

...product

});


this.showForm.set(true);


}




deleteProduct(product:IProduct){


this.products.update(products=>

products.filter(p=>

p.id !== product.id

)

);


}




closeForm(){

this.showForm.set(false);

}




saveProduct(){


const product = this.selectedProduct();



const exists = this.products()
.some(p=>

p.id === product.id

);



if(exists){


this.products.update(products=>

products.map(p=>

p.id === product.id

? product

: p

)

);



}
else{


this.products.update(products=>[

...products,

product

]);


}



this.showForm.set(false);


}




columnDefs:ColDef[]=[


{

headerName:'Image',

field:'image',

width:100,


cellRenderer:(params:any)=>{


return `

<img

src="${params.value}"

width="50"

height="50"

style="object-fit:contain"

/>

`;


}

},



{


headerName:'Product',

field:'title',

flex:2,

sortable:true,

filter:true


},



{


headerName:'Price',

field:'price',

sortable:true,


valueFormatter:(params)=>{


return `$${params.value}`;


}

},



{


headerName:'Category',

field:'category',

filter:true


},



{


headerName:'Rating',


valueGetter:(params)=>{


return params.data.rating.rate;


},


cellRenderer:(params:any)=>{


  const rating = Math.round(params.value);

  const stars = '⭐'.repeat(rating);

  return stars;

}

},



{


headerName:'Reviews',


valueGetter:(params)=>{


return params.data.rating.count;


}


},



{


headerName:'Actions',



cellRenderer:(params:any)=>{


const container =
document.createElement('div');


container.style.display='flex';

container.style.gap='8px';



const edit =
document.createElement('button');


edit.innerHTML =
`✏️`;


edit.onclick=()=>{

this.editProduct(params.data);

};




const del =
document.createElement('button');


del.innerHTML =
`🗑️`;


del.onclick=()=>{


this.deleteProduct(params.data);


};



container.appendChild(edit);

container.appendChild(del);



return container;


}


}



];



}