import { Restore } from './../../../../orm/Restore';
import { BackupListService } from 'src/app/service/admin/management/backup-list.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-restore-dialog',
  templateUrl: './restore-dialog.component.html',
  styleUrls: ['./restore-dialog.component.css']
})
export class RestoreDialogComponent  {
  dataBase!: String;
  restor: Restore = new Restore();
  constructor(
    public dialogRef: MatDialogRef<RestoreDialogComponent>,
    private bl:BackupListService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  restore() {
    this.restor.dataBaseName = this.dataBase;
    this.bl.restoreFile(this.restor).subscribe();
    this.dialogRef.close();
  }

}
