import { Component, inject, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ProductService } from '../../shared/services/products-services/products.service';
import { IProduct } from '../../shared/interface/product.interface';
import { ActionRenderer } from './actions/actions';

@Component({
  selector: 'app-products',
  standalone:true,
  imports:[
    AgGridAngular
  ],
  templateUrl:'./products.html',
  styleUrl:'./products.css'
})

export class Products {

  private productService = inject(ProductService);

  products = signal<IProduct[]>([]);

  constructor(){

    this.loadProducts();

  }

  loadProducts(){

    this.productService.getProducts()
    .subscribe(products=>{
      this.products.set(products);
    });
  }

  search(event:Event){

    const value =
    (event.target as HTMLInputElement).value.toLowerCase();


    this.productService.getProducts()
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
    console.log("product added");
  }

  editProduct(product:IProduct){

    console.log("edit",product);

  }


  deleteProduct(product:IProduct){
    
    this.productService
    .deleteProduct(product.id)
    .subscribe(()=>{

      this.products.update(products=>
        products.filter(p=>p.id!==product.id)
      );

    });
  }
  frameworkComponents = {

  actionRenderer: ActionRenderer

  };



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
      field:'title',
      headerName:'Product',
      flex:2,
      filter:true,
      sortable:true
    },


    {
      field:'price',
      headerName:'Price',
      sortable:true,

      valueFormatter:(params)=>{

        return `$${params.value}`;

      }

    },


    {
      field:'category',
      headerName:'Category',
      filter:true
    },


    {
      headerName:'Rating',

      valueGetter:(params)=>{

        return params.data.rating.rate;

      },

      cellRenderer:(params:any)=>{
        
        return `
        ⭐ ${params.value}
        `;

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

    const container = document.createElement('div');

    container.style.display = "flex";
    container.style.gap = "8px";


    const editBtn = document.createElement('button');

    editBtn.innerHTML = `<button style="background-color:grey; width:min-content">
      <i class="fa fa-pencil"></i></button>
    `;

    editBtn.className = "icon-btn edit";


    editBtn.onclick = () => {

      this.editProduct(params.data);

    };



    const deleteBtn = document.createElement('button');

    deleteBtn.innerHTML = `<button style="background-color:grey; width:min-content">
      <i class="fa fa-trash"></i></button>
    `;

    deleteBtn.className = "icon-btn delete";


    deleteBtn.onclick = () => {

      this.deleteProduct(params.data);

    };


    container.appendChild(editBtn);

    container.appendChild(deleteBtn);


    return container;

  }

}
  ];



}