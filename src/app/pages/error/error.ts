import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute,RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
    code='';
    message='';
    constructor(
      private auth:AuthService,
      private route:ActivatedRoute
    ){}
    ngOnInit(){
      this.code=this.route.snapshot.paramMap.get('code')??'';
      switch(this.code){
        case '401':
          this.message="Unauthorized"
          break
        case '403':
          this.message="Forbidden"
          break
        case '404':
          this.message="Page Not Found"
          break
        case '500':
          this.message="Internal Server Error"
          break
        default:
          this.message='Unexpected Error'
      }
    }
}
