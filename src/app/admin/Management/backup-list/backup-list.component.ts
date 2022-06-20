import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faFile, faFolder, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { File1 } from 'src/app/orm/file';
import { BackupListService } from 'src/app/service/admin/management/backup-list.service';
import { RestoreDialogComponent } from '../shared/restore-dialog/restore-dialog.component';

@Component({
  selector: 'app-backup-list',
  templateUrl: './backup-list.component.html',
  styleUrls: ['./backup-list.component.css']
})
export class BackupListComponent implements OnInit {
  faFolder = faFolder;
  faFile = faFile
  faDownload=faDownload
  oldId!:String

  dataSource:File1[]=[];
  open = false;
  progressFolder: boolean=true;
  progressFile: boolean=true;

  constructor(private backup: BackupListService,public dialog: MatDialog) { }
  admins!: Observable<File1[]>;
  file!:File1[];
  panelOpenState = false;

  
  ngOnInit() {
    console.log(this.dataSource);
    
    this.reloadData()
  }
  reloadData() {
    
    this.admins = this.backup.getDriveBackupFolderList();
    this.admins.forEach(b => {
      this.dataSource = b
      
      
      this.progressFolder=false
     
    })
    
  }
  
  
  displayedColumns: string[] = ['name']
  getFiles(id: String) {
    if (this.oldId !== id) {
      this.progressFile=true
      this.oldId=id
      console.log("yes");
      
    this.file = [];
    let files = this.backup.getDriveBackupFileList(id);
    files.forEach(b => {
      this.file = b;
      console.log(b);
      this.progressFile=false
      
    });
    }
    let test: File1 = new File1();
    test = { name: "test", id: "d", size: 10, createdTime: { value: 1, dateOnly: true, timeZoneShift: 1 } }
    this.file.push(test);
  }

  downloadFile(id:String,name:String) {
    this.backup.downloadFile(id).subscribe(
      response => {
        
        
        console.log(response.headers);
        
        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = name.toString()
        a.href = window.URL.createObjectURL(blob)
        a.click()
        
      }
    );

  }
  openDialog(id: String, name: String): void {
    //this.downloadFile(id, name);
    this.dialog.open(RestoreDialogComponent,{ data: {name: name,id:id},})
  }

  
  


}
