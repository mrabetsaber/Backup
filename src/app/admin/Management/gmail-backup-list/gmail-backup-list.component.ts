import { EmailAttachment } from './../../../orm/EmailAttachment';
import { Email } from './../../../orm/Email';
import { Component, OnInit } from '@angular/core';
import { faDownload, faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { File1 } from 'src/app/orm/file';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmailService } from 'src/app/service/Email/email.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gmail-backup-list',
  templateUrl: './gmail-backup-list.component.html',
  styleUrls: ['./gmail-backup-list.component.css']
})
export class GmailBackupListComponent implements OnInit {

  faFolder = faFolder;
  faFile = faFile
  faDownload=faDownload
  oldId!: String
  displayedColumns: string[] = [ 'name'];

  attachment: EmailAttachment[] = [];
  dataSource!: MatTableDataSource<EmailAttachment>;
  open = false;
  progressFolder: boolean=true;
  progressFile: boolean=true;
 
  constructor(private backup:EmailService ,public dialog: MatDialog) { }
  emails!: Observable<EmailAttachment[]>;
  file!:File1[];
  panelOpenState = false;

  
  ngOnInit() {
    
    this.reloadData()
  }
  reloadData() {
    
    this.emails = this.backup.getEmailList();
    this.emails.forEach(b => {
      this.attachment =b
      
      //this.dataSource.push({name:'saber',size:0,path:''})
     console.log(b);
     this.dataSource = new MatTableDataSource(this.attachment);
      
      
     
    })
    
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
  // displayedColumns: string[] = ['name']
  // getFiles(id: String) {
  //   if (this.oldId !== id) {
  //     this.progressFile=true
  //     this.oldId=id
  //     console.log("yes");
      
  //   this.file = [];
  //   let files = this.backup.getDriveBackupFileList(id);
  //   files.forEach(b => {
  //     this.file = b;
  //     console.log(b);
  //     this.progressFile=false
      
  //   });
  //   }
  // }

  // downloadFile(id:String,name:String) {
  //   this.backup.downloadFile(id).subscribe(
  //     response => {
        
        
  //       console.log(response.headers);
        
  //       let blob: Blob = response.body as Blob;
  //       let a = document.createElement('a');
  //       a.download = name.toString()
  //       a.href = window.URL.createObjectURL(blob)
  //       a.click()
        
  //     }
  //   );

  // }
  // openDialog(id: String, name: String): void {
  //   //this.downloadFile(id, name);
  //   this.dialog.open(RestoreDialogComponent)
  // }

  
}
