import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
// import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  // imports: [CommonModule],
  templateUrl: './buttons.html',
  styleUrls: ['./buttons.css']
})
export class Button {

  text=input('button');
  buttonClass=input('');
  type=input<'button' | 'submit' | 'reset'>('button');
  disabled=input(false);
  clicked =output<void>();

  onClick() {
    this.clicked.emit();
  }

}