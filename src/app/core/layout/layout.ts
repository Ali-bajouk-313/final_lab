import {ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
