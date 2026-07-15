import { Component, signal } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import {Register} from '../app/pages/register/register'
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Final_project');
}
