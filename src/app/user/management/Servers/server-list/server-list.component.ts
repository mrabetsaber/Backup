import { Server } from 'src/app/orm/Server';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/service/Server/server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  constructor(private sserv:ServerService,private router: Router,public dialog: MatDialog) { }
  server!: Observable<Server[]>;

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.server = this.sserv.getServerList();
    this.server.forEach(b => {
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
  
  updateBackup(id: number){
    this.router.navigate(['/updateServer', id]);
    
    
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
