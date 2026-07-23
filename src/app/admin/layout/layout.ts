import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Admin } from '../admin';
@Component({
  selector: 'app-layout',
  imports: [Admin],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
