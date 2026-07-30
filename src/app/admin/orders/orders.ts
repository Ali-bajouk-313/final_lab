import { Component, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { AuthService } from '../../core/auth/auth.service';
import { IOrder, IUser } from '../../shared/interface/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [AgGridAngular, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {


  orders = signal<any[]>([]);

  showform = signal(false);


  selectedOrder = signal<any>({
    id:0,
    date:'',
    status:'Pending',
    total:0,
    items:[],
    shipping:{
      username:'',
      email:'',
      address:'',
      city:'',
      state:'',
      zip:'',
      country:'',
      phone:''
    }
  });



  constructor(
    private auth:AuthService
  ){}

  ngOnInit(){

  const users = this.auth.getallUSers();

  console.log("All users:", users);


  const allOrders:any[] = [];


  users.forEach((user:IUser)=>{


    if(user.orders && user.orders.length > 0){


      user.orders.forEach((order:any)=>{


        allOrders.push({

          ...order,

          username:user.username,
          email:user.email,

          shipping: order.shipping || {
            username:user.username,
            email:user.email,
            address:'',
            city:'',
            country:'',
            phone:''
          }

        });


      });


    }


  });



  console.log("Orders for grid:", allOrders);


  this.orders.set(allOrders);

}


  columnDefs:ColDef[]=[


    {
      headerName:'Customer',
      field:'username',
      flex:1
    },
    {
      headerName:'Order ID',
      field:'id',
      flex:1
    },


    {
      headerName:'Date',
      field:'date',
      flex:1
    },


    {
      headerName:'Status',
      field:'status',
      flex:1
    },


    {
      headerName:'Total',
      field:'total',
      valueFormatter:(params)=>`$${params.value}`,
      flex:1
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


        edit.innerHTML='✏️';


        edit.onclick=()=>{

          this.editOrder(params.data);

        };



        const del =
        document.createElement('button');


        del.innerHTML='🗑️';



        del.onclick=()=>{

          this.deleteOrder(params.data);

        };



        container.appendChild(edit);
        container.appendChild(del);



        return container;

      }

    }


  ];

  editOrder(order:any){


    this.selectedOrder.set({

      ...order,

      shipping:{
        ...order.shipping
      }

    });
    this.showform.set(true);
  }

  deleteOrder(order:any){

  this.orders.update(orders=>
    orders.filter(
      o=>o.id !== order.id
    )
  );

  }





  closeForm(){

    this.showform.set(false);

  }
  saveOrder(){

    const order = this.selectedOrder();

    this.auth.updateOrder(order);


    this.orders.update(orders=>

      orders.map(o=>

        o.id === order.id
        ?
        order
        :
        o

      )

    );


    this.showform.set(false);


  }
}