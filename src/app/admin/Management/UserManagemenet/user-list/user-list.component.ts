import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/orm/Server';
import { AppUserService } from 'src/app/service/appUser/app-user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import Swal from 'sweetalert2';
interface DB {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private appUserservice:AppUserService,private router: Router,public dialog: MatDialog,public auth:AuthService) { }
  user!: Observable<AppUser[]>;
 
  displayedColumns: string[] = [ 'firstName','lastName','email','role','action','action1'];

  attachment: AppUser[] = [];
  dataSource!: MatTableDataSource<AppUser>;
  
  data!: DialogData
 
 


  ngOnInit(): void {
    this.reloadData();
  }
 
  reloadData() {
   
    this.user = this.appUserservice.getAppUserList();
    this.user.forEach(b => {
      this.attachment = b
      
      
      //this.dataSource.push({name:'saber',size:0,path:''})
     console.log(b);
     this.dataSource = new MatTableDataSource(this.attachment);
      
    })
  }
  
  delete(id: number) {
    if (id.toString() == this.auth.getLoginUser()?.toString()) {
      Swal.fire(
        'Error',
        "you can't delete this user",
        'error'
      )
    } else {
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
       
          let that = this
          this.appUserservice.deleteAppUser(id)
            .subscribe(
              {
                complete() {
           
                  Swal.fire(
                    'Deleted!',
                    'user has been deleted.',
                    'success'
                  )
                  that.reloadData();
                }, error(err) {
                  if (err.status === 0) {
                    // A client-side or network error occurred. Handle it accordingly.
                    Swal.fire(
                      'Error',
                      "network error occurred",
                      'error'
                    )
                    console.error('An error occurred:', err.error, err.status);
                  } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong.
                    Swal.fire(
                      'Error',
                      err.message,
                      'error'
                    )
                    console.error(
                      `Backend returned code ${err.status}, body was: `, err.error);
                  }
          
                }
              });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'user  delete is canceled :)',
            'error'
          )
        }
      })
    }
  }
  
  update(id: number) {
    
    
    let that = this;
    this.appUserservice.getAppUser(id).subscribe({
      error(err) {
        if (err.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          Swal.fire(
            'Error',
           "network error occurred",
            'error'
          )
          console.error('An error occurred:', err.error,err.status);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          Swal.fire(
            'Error',
           err.message,
            'error'
          )
          console.error(
            `Backend returned code ${err.status}, body was: `, err.error);
        }
      }, next(data) {
        
        that.data=data
        const dialogRef = that.dialog.open(UpdateUserComponent, {
          data: {
            firstName: that.data.firstName,
            lastName: that.data.lastName,
            id: that.data.id,
            email: that.data.email,
            appUserRole:that.data.appUserRole
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          that.reloadData()
          if (result) {
          //   this.bserv.deleteBackup(id)
          // .subscribe(
          //   data => {
          //     console.log(data);
          //     this.reloadData();
          //   });
            console.log("yes");
            
            
          }
          
        });

      }
    }
      
    )
  
    
    // this.router.navigate(['/updateServer', id]);
   
    
  }
  
 
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
}


export interface DialogData {
  id: number;
  firstName: String;
  lastName: String;
  email: String;
  appUserRole: String;
  
}

@Component({
  selector: 'app-dialog',
  templateUrl: './upateUser.component.html',
})
export class UpdateUserComponent implements OnInit {
  result = true
  role: DB[]= [{value:1,viewValue:"ADMIN"},{value:2,viewValue:"USER"}];
  firstFormGroup=new FormGroup({});
  user: AppUser = new AppUser();
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private appUserservice:AppUserService,private _formBuilder: FormBuilder
    ,public auth:AuthService) { }
  r!: number;
  ngOnInit(): void {
    console.log("data"+this.data.appUserRole);
    
    if (this.data.appUserRole == "ADMIN") {
      this.r = 1;
    }
    else if (this.data.appUserRole == "USER") {
      this.r = 2;
    
    }
    this.firstFormGroup = this._formBuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      role:[this.r, Validators.required]
      
    });
    let that = this;
  
  }




 
  submit() {
    this.user.email = this.firstFormGroup.value.email
    this.user.lastName = this.firstFormGroup.value.lastName
    this.user.firstName = this.firstFormGroup.value.firstName
    if (this.firstFormGroup.value.role == 1) {
      
      this.user.appUserRole ="ADMIN"
    }
    else if (this.firstFormGroup.value.role == 2) {
      this.user.appUserRole = "USER"
      
    
    }
    console.log(this.user);
    let that = this;
    this.appUserservice.updateAppUser(that.data.id,this.user).subscribe(
      {
        next() {
          Swal.fire('Done...', 'You update the user successfully', 'success').then(() => {
            if (that.data.id.toString() == that.auth.getLoginUser()?.toString()&&!(that.user.appUserRole==that.data.appUserRole)) {
              that.auth.logout();
            }
            
            that.dialogRef.close();
          });
          
        },
        error(err) {
          if (err.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            Swal.fire(
              'Error',
             "network error occurred",
              'error'
            )
            console.error('An error occurred:', err.error,err.status);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            Swal.fire(
              'Error',
             err.message,
              'error'
            )
            console.error(
              `Backend returned code ${err.status}, body was: `, err.error);
          }
        
      
    }});
  // //this.router.navigate(['/user']);
    
  }
  close(): void {
    this.dialogRef.close();
  }
}