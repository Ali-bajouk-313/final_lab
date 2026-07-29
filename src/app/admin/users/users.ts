import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { IUser } from '../../shared/interface/user.interface';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-users',
  imports: [AgGridAngular,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {


  users = signal<IUser[]>([]);

  showform=signal(false);
  constructor(
    private auth: AuthService
  ){}
  
  selectedUser = signal<IUser>({
      id:0,
      username:'',
      email:'',
      password:'',
      role:'user' as 'user' | 'admin',
      addresses:[
        {
        id:0,
        street:'',
        city:'',
        country:'',
        phone:''
      }
      ],
      orders:[],
      cart:[],
      favorite:[]
  });

  ngOnInit(){

    this.users.set(
      this.auth.getallUSers()
    );
    console.log('admin user opened')
    console.log(this.auth.getAddresses());
    console.log(this.users)
  }
  columnDefs: ColDef[] = [
    {
      headerName:'Username',
      field:'username',
      flex:1
    },
    {
      headerName:'Email',
      field:'email',
      flex:2
    },
    {
      headerName:'Phone',
      valueGetter:(params)=>params.data.addresses?.[0]?.phone || 'No phone',
      flex:1
    },
    {
      headerName:'Country',
      valueGetter:(params)=>params.data.addresses?.[0]?.country || 'No address',
      flex:1
    },
    {
      headerName:'City',
      valueGetter:(params)=>params.data.addresses?.[0]?.city || 'No address',
      flex:1
    },
    {
      headerName:'Street',
      valueGetter:(params)=>params.data.addresses?.[0]?.street || 'No address',
      flex:1
    },
    {
      headerName:'Role',
      field:'role',
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


    edit.innerHTML =
    `✏️`;


    edit.onclick=()=>{

    this.edituser(params.data);

    };




    const del =
    document.createElement('button');


    del.innerHTML =
    `🗑️`;


    del.onclick=()=>{


    this.deleteuser(params.data);


    };



    container.appendChild(edit);

    container.appendChild(del);



    return container;


    }


    }
  ];
  edituser(user:IUser){
    this.selectedUser.set({
      ...user
    });
    this.showform.set(true);
  }
  
    deleteuser(user:IUser){
      this.auth.removeUser(user.id);
      this.users.update(users =>
        users.filter(u => u.id !== user.id)
    );
  }

  closeForm(){
    this.showform.set(false);
  }
  saveUser(){

    const user = {
      ...this.selectedUser(),
      addresses:[
        {
          ...this.selectedUser().addresses[0],
          id: Date.now()
        }
      ]
    };
    if(user.id === 0){

      user.id = Date.now();

      this.auth.addUser(user);


      this.users.update(users=>[
        ...users,
        user
      ]);

    }  else{

      this.auth.updateUser(user);


      this.users.update(users=>
        users.map(u=>
          u.id === user.id
          ? user
          : u
        )
      );

    }
    this.showform.set(false);
  }
}