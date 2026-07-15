import { Component,input,output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  text=input('');
  buttonClass=input('');
  type=input<'text' | 'password' | 'email' >('text');
  disabled=input(false);
  inputplaceholder=input('');
  clicked =output<void>();
  valueChange=output<string>();
  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
  onclick() {
    this.clicked.emit();
  }
}
