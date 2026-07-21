import { RouterOutlet } from '@angular/router';
import {Component} from '@angular/core'
import {Products} from '../admin/products/products'

@Component({
  selector:'app-admin',
  standalone:true,
  imports:[RouterOutlet],
  templateUrl:'./admin.html',
  styleUrl: './admin.css'
})
export class Admin {}