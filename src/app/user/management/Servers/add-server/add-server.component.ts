import { AuthService } from 'src/app/service/auth/auth.service';
import { AppUser, Server } from './../../../../orm/Server';
import { ServerService } from './../../../../service/Server/server.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user/user.service';





@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {





 
  
  showFiller = false;
  isLinear = false;
  firstFormGroup=new FormGroup({});
  server: Server = new Server();
  constructor(private userservice:UserService,private authService:AuthService,private _formBuilder: FormBuilder,private serverService:ServerService,private router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      serverUserName: ['', Validators.required],
      serverPassword: ['', Validators.required],
      hostName:['',Validators.required]
    });
    
  
  }
 
  

  submit() {
    this.server.host = this.firstFormGroup.value.hostName
    this.server.password = this.firstFormGroup.value.serverPassword
    this.server.userName = this.firstFormGroup.value.serverUserName
    let id=+this.authService.getLoginUser()!
    if (id != null) {
      this.userservice.getUser(id).subscribe(data => {
        this.server.user={"id":data.id,"appUserRole":data.appUserRole}
        this.serverService.createServer(this.server).subscribe(
            {
              complete() {
                Swal.fire('Done...', 'You add the server successfuly', 'success');
                that.router.navigate(['/user']);
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
        
      })
    }
  //  this.server.user = +id;
    console.log(this.server);
    let that = this;
    // 
  //this.router.navigate(['/user']);
    
  }


  simpleAlert(){
    Swal.fire('Hello world!');
  }
  
  alertWithSuccess(){
    Swal.fire('Done...', 'You add the server successfuly', 'success')
  }
  
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
