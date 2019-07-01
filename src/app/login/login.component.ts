import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth-servise.service';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public passwordField:string = "password";
  public iconPassword:string = "visibility";
  public user : User;
  public error;
  public login = this.fb.group({
    username : ['',Validators.required],
    password:['',Validators.required],
  })

  constructor(private fb:FormBuilder,private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){

    let isAuthenticated = this.auth.loginUser(this.login.value);

    if(isAuthenticated){
      this.error = false;        
      this.router.navigate(['dashboard']);
    }else{
      this.error = true;
    }

  }

  passwordFieldToggle(){
    this.iconPassword = (this.iconPassword==="visibility")?"visibility_off":"visibility";
    this.passwordField = (this.passwordField ==="password")?"text":"password";

  }

}
