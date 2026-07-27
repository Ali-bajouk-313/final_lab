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


  constructor(
    private auth: AuthService
  ){}


  ngOnInit(){

    this.users.set(
      this.auth.getallUSers()
    );
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
      valueGetter:(params)=>params.data.addresses?.phone || 'No address',
      flex:1
    },

    {
      headerName:'Country',
      valueGetter:(params)=>params.data.addresses?.country || 'No address',
      flex:1
    },

    {
      headerName:'City',
      valueGetter:(params)=>params.data.addresses?.city || 'No address',
      flex:1
    },

    {
      headerName:'Street',
      valueGetter:(params)=>params.data.addresses?.street || 'No address',
      flex:1
    },

    {
      headerName:'Role',
      field:'role',
      flex:1
    }

  ];
}