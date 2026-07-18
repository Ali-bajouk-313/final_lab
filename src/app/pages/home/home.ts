import {ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection:ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
