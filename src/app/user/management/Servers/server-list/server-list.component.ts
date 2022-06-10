import { Server } from 'src/app/orm/Server';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/Server/server.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort ;
  constructor(private sserv:ServerService,private router: Router,public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) { }
  server!: Observable<Server[]>;
 
  displayedColumns: string[] = [ 'userName','password','host','actions','actions1'];

  attachment: Server[] = [];
  dataSource!: MatTableDataSource<Server>;
  
  data!: DialogData
 
  


  ngOnInit(): void {
    this.reloadData();
  }
 
  reloadData() {
   
    this.server = this.sserv.getServerList();
    this.server.forEach(b => {
      this.attachment =b
      
      //this.dataSource.push({name:'saber',size:0,path:''})
     console.log(b);
     this.dataSource = new MatTableDataSource(this.attachment);
      
    })
  }
  
  delete(id:number){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
       
        let that=this
        this.sserv.deleteServer(id)
        .subscribe(
         { complete() {
           
           Swal.fire(
            'Deleted!',
            'Your Server has been deleted.',
            'success'
          )
           that.reloadData();
          },error(err) {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Server  is safe :)',
          'error'
        )
      }
    })
  }
  
  
  update(id: number) {
    
    
    let that = this;
    this.sserv.getServer(id).subscribe({
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
        const dialogRef = that.dialog.open(UpdateServerComponent, {
          data: {
            userName: that.data.userName,
            password: that.data.password,
            id: that.data.id,
            host:that.data.host
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
  userName: String;
  password: String;
  host: String;
  
}

@Component({
  selector: 'app-dialog',
  templateUrl: './updateServer.component.html',
  styleUrls: ['./server-list.component.css']
})
export class UpdateServerComponent implements OnInit {
  result = true
 
  firstFormGroup=new FormGroup({});
  server: Server = new Server();
  constructor(
    public dialogRef: MatDialogRef<UpdateServerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private sserv:ServerService,private _formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    console.log(this.data);
    
    this.firstFormGroup = this._formBuilder.group({
      serverUserName: [this.data.userName, Validators.required],
      serverPassword: [this.data.password, Validators.required],
      hostName: [this.data.host, Validators.required]
    });
    let that = this;
  }
 
  submit() {
    this.server.host = this.firstFormGroup.value.hostName
    this.server.password = this.firstFormGroup.value.serverPassword
    this.server.userName = this.firstFormGroup.value.serverUserName
    console.log(this.server);
    let that = this;
    this.sserv.updateServer(that.data.id,this.server).subscribe(
      {
        next() {
          Swal.fire('Done...', 'You update the server successfully', 'success');
          that.dialogRef.close();
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
  //this.router.navigate(['/user']);
    
  }
  close(): void {
    this.dialogRef.close();
  }
}
