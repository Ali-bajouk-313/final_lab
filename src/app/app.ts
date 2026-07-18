import {ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import {Register} from '../app/pages/register/register'
import {RouterOutlet} from '@angular/router';
import { Footer } from './shared/components/footer/footer';
@Component({
  selector: 'app-root',
  changeDetection:ChangeDetectionStrategy.OnPush, 
  imports: [Navbar, CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Final_project');
}
