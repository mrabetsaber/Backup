import { AuthUser } from 'src/app/orm/AuthUser';

import { User } from 'src/app/orm/User';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id!: number;
  faLock = faLock;
  user: User = new User();
 
  authUser!: AuthUser;
  loginForm = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('', Validators.required),
    
  });
  constructor(private userser: UserService,private router: Router) {}
    that=this
  ngOnInit(): void {
   
  }
  
  
  
  
  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
 

  
  onSubmit(): void {
    
    this.user.email = this.email.value;
    this.user.password = this.password.value; 
    const that=this
    this.userser.login(this.user).subscribe(
      {
        next(data:AuthUser) {
     
        that.authUser = data;
        }, error(err) {
          console.log(err.message);
          
      }
       
      
      
    ,complete(){ that.router.navigate([that.authUser.appUserRole.toLocaleLowerCase()])}})    
    
   
    
  }
  
}
