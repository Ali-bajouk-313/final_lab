import {ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import { MainLayout } from './core/layout/main-layout/main-layout';
@Component({
  selector: 'app-root',
  changeDetection:ChangeDetectionStrategy.OnPush, 
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Final_project');
}
