import { ParametrageBackup } from './../../../../orm/ParametrageBackup';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParametrageBackupService } from 'src/app/service/ParametrageBackup/parametrage-backup.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableHistoryService } from 'src/app/service/tableHistory/table-history.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  constructor(private tableService:TableHistoryService,private router: Router,public dialog: MatDialog ) { }
  parametrage!: Observable<TableHistoryService[]>;
 
  displayedColumns: string[] = [ 'tableName','schedule','fileName','actions1'];

  attachment: TableHistoryService[] = [];
  dataSource!: MatTableDataSource<TableHistoryService>;
  
  data!: DialogData
 
  


  ngOnInit(): void {
    this.reloadData();
  }
 
  reloadData() {
   
    this.parametrage = this.tableService.getParametrageHistoriqueList();
    this.parametrage.forEach(b => {
      this.attachment = b
      
      
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
        this.tableService.deleteParametrageHistorique(id)
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
    this.tableService.getParametrageHistorique(id).subscribe({
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
        /*
        that.data=data
        const dialogRef = that.dialog.open(UpdateSchedule, {
          data: {
            dataBase: that.data.database,
            schedule: that.data.schedule,
            id: that.data.id,
            email:that.data.email
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
          
        });*/

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
  database: String;
  schedule: String;
  email: String;
  
}
/*
@Component({
  selector: 'app-dialog',
  templateUrl: './update-schedule-list.component.html',
})
export class UpdateSchedule implements OnInit {
  result = true
 
  firstFormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<UpdateSchedule>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private tableService: TableHistoryService, private _formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    console.log(this.data);
    
    this.firstFormGroup = this._formBuilder.group({
      schedule: [this.data.schedule, Validators.required],
      dataBaseName: [this.data.database, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]]
    });
    let that = this;
  }



  fileName!: String;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name
    }
  }
 
  submit() {
    
    let table = {
      "fileName": this.fileName,
      "tableName": this.firstFormGroup.value.tableName
    }
    let that = this;
    this.tableService.updateParametrageHistorique(that.data.id, table).subscribe(
      {
        next() {
          Swal.fire('Done...', 'You update the schedule successfully', 'success');
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
    //this.router.navigate(['/user']);
    
  }
  close(): void {
    this.dialogRef.close();
  }
}*/