import {ChangeDetectionStrategy,Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  changeDetection:ChangeDetectionStrategy.OnPush,
  standalone:true,
  templateUrl:'./input.html',
  styleUrl:'./input.css',

  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>Input),
      multi:true
    }
  ]

})
export class Input implements ControlValueAccessor {


  type=input<'text' | 'password' | 'email'>('text');

  inputplaceholder=input('');

  buttonClass=input('');

  disabled=input(false);



  value='';


  onChange:any = ()=>{};
  onTouched:any = ()=>{};



  writeValue(value:string):void{

    this.value=value || '';

  }


  registerOnChange(fn:any):void{

    this.onChange=fn;

  }


  registerOnTouched(fn:any):void{

    this.onTouched=fn;

  }


  setDisabledState(isDisabled:boolean){

  }



  handleInput(event:Event){

    const value=(event.target as HTMLInputElement).value;

    this.value=value;

    this.onChange(value);

    this.onTouched();

  }

}