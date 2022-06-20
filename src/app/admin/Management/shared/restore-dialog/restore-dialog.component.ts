import { Restore } from './../../../../orm/Restore';
import { BackupListService } from 'src/app/service/admin/management/backup-list.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

export interface DialogData {
  name: string;
  id:String
}
@Component({
  selector: 'app-restore-dialog',
  templateUrl: './restore-dialog.component.html',
  styleUrls: ['./restore-dialog.component.css']
})
export class RestoreDialogComponent  {
  dataBase!: String;
  userName!: String;
  host!: String;
  
  restor: Restore = new Restore();
  constructor(
    public dialogRef: MatDialogRef<RestoreDialogComponent>,
    private bl: BackupListService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  downloadAndRestore() {
    let that = this;
    this.bl.downloadFile(this.data.id).subscribe({
     next( response) {
        
        
        console.log(response.headers);
        
        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = that.data.name.toString()
        a.href = window.URL.createObjectURL(blob)
        a.click()
        Swal.fire(
          'ok',
         "file dowload successfuly",
         "success"
        ).then(()=>that.restore())
      }, error(err) {
        Swal.fire(
          'Error',
         err.message,
          'error'
        )
      }
    })

  }
  restore() {
    this.restor.dataBaseName = this.dataBase;
    this.restor.host = this.host;
    this.restor.userName = this.userName
    this.restor.fileName = this.data.name
    this.bl.restoreFile(this.restor).subscribe({
      next() {
        Swal.fire(
          'ok',
         "data base restored successfuly",
         "success"
        )
      }, error(err) {
        Swal.fire(
          'Error',
         err.message,
          'error'
        )
    }});
    this.dialogRef.close();
  }

}
