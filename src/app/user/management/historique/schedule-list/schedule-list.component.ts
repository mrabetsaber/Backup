import { ParametrageBackup } from './../../../../orm/ParametrageBackup';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParametrageBackupService } from 'src/app/service/ParametrageBackup/parametrage-backup.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  constructor(private bserv: ParametrageBackupService,private router: Router,public dialog: MatDialog) { }
  backup!: Observable<ParametrageBackup[]>;

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.backup = this.bserv.getBackupList();
    this.backup.forEach(b => {
      b.map(b1 => {
        console.log(b1);
        
      });
      
    })
    
  }
  deleteBackup(id: number): void {

    
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.bserv.deleteBackup(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        });
        console.log("yes");
        
        
      }
      
    });
    
  }
  
  updateBackup(id: number){
    this.router.navigate(['/updateBackup', id]);
    
    
  }

}


export interface DialogData {
  schedule: string;
  dataBaseName: string;
  server: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnInit {
  result = true;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
