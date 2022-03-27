import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { User } from 'src/app/orm/User';
import { AdminService } from 'src/app/service/admin/admin.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-update-parametrage-backup',
  templateUrl: './update-parametrage-backup.component.html',
  styleUrls: ['./update-parametrage-backup.component.css']
})
export class UpdateParametrageBackupComponent implements OnInit {

  id!: number;
  admin!: User;
  users!: Observable<User[]>;
  admins!: Observable<User[]>;
  teachers!: Observable<User[]>;
  students!: Observable<User[]>;
  emailExist = false;
  prenom: String = '';
  faUserEdit = faUserEdit;
  updateForm = new FormGroup({
    'firstName': new FormControl(this.prenom, Validators.required,),
    'lastName':new FormControl(null, Validators.required),
    'email': new FormControl(null,[Validators.required, Validators.email]),
    
  });
  constructor(private route: ActivatedRoute,private userser: UserService,private router: Router,private aserv: AdminService) { }

  ngOnInit(): void {

    this.reloadData();
    this.admin = new User();


    this.id = this.route.snapshot.params['id'];
    
    this.aserv.getAdmin(this.id)
      .subscribe(data => {
        console.log(data)
        this.updateForm.setValue({ 'firstName': data.prenom, 'lastName': data.nom, 'email': data.email });
        this.admin.id = data.id;
        this.admin.password = data.password;
      });
  }

  updateAdmin() {
    this.admin.email = this.email.value;
    this.admin.nom = this.lastName.value;
    this.admin.prenom = this.firstName.value;
    this.aserv.updateAdmin(this.id, this.admin)
      .subscribe(data => {
        console.log(data);
        this.admin = new User();
      })
    this.router.navigate(['admin/adminList'])
  }

  onSubmit() {
    this.updateAdmin();    
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

  reloadData() {
    this.users = this.userser.getUserList();
    this.admins = this.aserv.getAdminList();
   
    
  }

  get firstName() {
    return this.updateForm.get('firstName')!;
  }
  get lastName() {
    return this.updateForm.get('lastName')!;
  }
  get email() {
    return this.updateForm.get('email')!;
  }
}
