import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component  { 

  email:string='';
  password:string='';
  message:string='';
  isSuccess:boolean=false;

  constructor(private http:HttpClient,private router:Router){}
  onSubmit(){
    const loginData={email:this.email,password:this.password};
    
    this.http.post('http://localhost:9000/project/login3',loginData,{responseType:'text'})
    .pipe(
      tap({
        next:(response:string)=>{
          this.message=response;
          this.isSuccess=true;
           
          this.router.navigate(['/admin_page']);
        },
        error:(error)=>{
          this.message=error.error||'Login failed';
          this.isSuccess=false;
        }
      })
    )
    .subscribe();
  }

}
