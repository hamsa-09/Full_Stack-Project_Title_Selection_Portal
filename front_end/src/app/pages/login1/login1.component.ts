import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css']
})
export class Login1Component  { 
          email:string='';
          password:string='';
          message:string='';
          isSuccess:boolean=false;

          constructor(private http:HttpClient,private router:Router){}
          onSubmit(){
            const loginData={email:this.email,password:this.password};
            
            this.http.post('http://localhost:9000/project/login2',loginData,{responseType:'text'})
            .pipe(
              tap({
                next:(response:string)=>{
                  this.message=response;
                  this.isSuccess=true;
                  localStorage.setItem('guideEmail', this.email);
                  this.router.navigate(['/guide']);
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
