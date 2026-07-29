import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/interface/user.interface';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';


@Component({
  selector:'app-profile',
  changeDetection:ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[
    ReactiveFormsModule
  ],
  templateUrl:'./profile.html',
  styleUrl:'./profile.css'
})


export class Profile implements OnInit {


  user:IUser | null = null;

  addressForm!:FormGroup;

  isEditing=false;


  constructor(
    private auth:AuthService,
    private router:Router,
    private fb:FormBuilder
  ){}



  ngOnInit(){


    this.user=this.auth.getuser();


    const address=this.user?.addresses?.[0];


    this.addressForm=this.fb.group({

      street:[
        address?.street || '',
        Validators.required
      ],

      city:[
        address?.city || '',
        Validators.required
      ],

      country:[
        address?.country || '',
        Validators.required
      ],

      phone:[
        address?.phone || '',
        Validators.required
      ]

    });



    this.addressForm.disable();


  }




  toggleEdit(){


    if(this.isEditing){

      this.saveAddress();

      this.addressForm.disable();

    }

    else{

      this.addressForm.enable();

    }


    this.isEditing=!this.isEditing;


  }





  saveAddress(){


    if(!this.user){
      return;
    }


    if(this.addressForm.invalid){

      this.addressForm.markAllAsTouched();

      return;

    }


    const updatedAddress={

      id:this.user.addresses?.[0]?.id || Date.now(),

      street:this.addressForm.value.street,

      city:this.addressForm.value.city,

      country:this.addressForm.value.country,

      phone:this.addressForm.value.phone

    };
    if(this.user.addresses.length > 0){

      this.user.addresses[0]=updatedAddress;

    }
    else{

      this.user.addresses.push(updatedAddress);

    }



    this.auth.updateUser(this.user);


    console.log(
      "Updated user:",
      this.user
    );


  }




  addAddress(){


    if(this.addressForm.invalid){

      this.addressForm.markAllAsTouched();

      return;

    }


    if(!this.user){
      return;
    }


    const address={

      id:Date.now(),

      street:this.addressForm.value.street,

      city:this.addressForm.value.city,

      country:this.addressForm.value.country,

      phone:this.addressForm.value.phone

    };



    this.user.addresses.push(address);



    this.auth.updateUser(this.user);



    this.addressForm.reset();


  }





  removeAddress(id:number){


    if(!this.user){
      return;
    }


    this.user.addresses =
    this.user.addresses.filter(
      address=>address.id !== id
    );


    this.auth.updateUser(this.user);



  }




  logout(){

    this.auth.logout();

    this.router.navigate(['/login']);

  }


}