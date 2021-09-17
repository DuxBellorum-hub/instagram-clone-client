import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage : string;

  
  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    this.errorMessage = "";
    if(localStorage.getItem("token")) {
      this.router.navigate(["/profil"]);
    }
  }

  login():void{
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.login(user).subscribe(data => this.handleSuccess(data), err => {
      this.errorMessage = err.error;
    })
   
  }

  handleSuccess(data):void{
    this.errorMessage ="";
    if(data.token){
      localStorage.setItem("token", data.token);
    }
    this.router.navigate(["/profil"]);

  }
  
  

}
