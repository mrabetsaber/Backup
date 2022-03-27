
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
   
  emailExist=false;
  faUserPlus = faUserPlus;
  roles = ['user', 'Admin',
            'admin'];
  registerForm = new FormGroup({
    'firstName': new FormControl(null, Validators.required),
    'lastName':new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required),
    'Rpassword': new FormControl(null, Validators.required),
    'role': new FormControl('Student')
  });
  authuser: AuthUser = new AuthUser();
  users!: Observable<User[]>;
  admins!: Observable<User[]>;
  teachers!: Observable<User[]>;
  students!: Observable<User[]>;
  constructor(private userser: UserService,private aserv:AdminService,private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
   
  }

  reloadData() {
    this.users = this.userser.getUserList();
    this.admins = this.aserv.getAdminList();
   
    
  }
  save() {
    this.authuser.email = this.email.value;
    this.authuser.prenom = this.firstName.value;
    this.authuser.nom = this.lastName.value;
    this.authuser.password = this.password.value;
    this.authuser.role = this.role.value;
    this.userser
      .createUser(this.authuser).subscribe(data => {
        console.log(data)
      
      
      })
  }

  emailCheck(): void{
    this.emailExist = false;
    this.users.forEach(user => {
      user.map(user => {
        
        if (user.email == this.email.value) {
          this.emailExist = true;
          
        }
        
      })
    });
    this.students.forEach(user => {
      user.map(user => {
        if (user.email == this.email.value) {
          this.emailExist = true;
          
        }
        
      })
    });
    this.teachers.forEach(user => {
      user.map(user => {
        if (user.email == this.email.value) {
          this.emailExist = true;
          
        }
        
      })
    });
    this.admins.forEach(user => {
      user.map(user => {
        if (user.email == this.email.value) {
          this.emailExist = true;
          
        }
        
      })
    });
    
  }
  onSubmit(): void {

    
    
   this.save();
    
    this.registerForm.reset();
    alert('You submitted successfully!');
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
  get role() {
    return this.registerForm.get('role')!;
  }
  

}
