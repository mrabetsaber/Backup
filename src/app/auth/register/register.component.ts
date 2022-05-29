
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/orm/AuthUser';
import { User } from 'src/app/orm/User';
import { AdminService } from 'src/app/service/admin/admin.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  faUserPlus = faUserPlus;

  registerForm = new FormGroup({
    'firstName': new FormControl(null, Validators.required),
    'lastName':new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required),
    'Rpassword': new FormControl(null, Validators.required),
    
  });
  authuser: AuthUser = new AuthUser();
  
  constructor(private userser: UserService,private aserv:AdminService,private router: Router) {}

  ngOnInit(): void {
    
   
  }

  
  save() {
    let user={
      "firstName":this.firstName.value,
      "lastName":this.lastName.value,
      "email":this.email.value,
      "password":this.password.value
    }
    this.authuser.email = this.email.value;
    this.authuser.firstName = this.firstName.value;
    this.authuser.lastName = this.lastName.value;
    this.authuser.password = this.password.value;
    
    this.userser
      .createUser(user).subscribe({error(error){console.log(error.message);
      }})
  }

 
  onSubmit(): void {

    
    
   this.save();
    
    this.registerForm.reset();
    this.router.navigate(["/login"]);
    
  }
  
  get firstName() {
    return this.registerForm.get('firstName')!;
  }
  get lastName() {
    return this.registerForm.get('lastName')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }
  get Rpassword() {
    return this.registerForm.get('Rpassword')!;
  }
 
  

}
