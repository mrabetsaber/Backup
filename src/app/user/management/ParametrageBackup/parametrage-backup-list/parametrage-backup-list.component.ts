import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/orm/User';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-parametrage-backup-list',
  templateUrl: './parametrage-backup-list.component.html',
  styleUrls: ['./parametrage-backup-list.component.css']
})
export class ParametrageBackupListComponent implements OnInit {
  constructor(private aserv: AdminService,private router: Router) { }
  admins!: Observable<User[]>;

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.admins = this.aserv.getAdminList();
  }
  deleteAdmin(id: number) {
    console.log(id);
    
    this.aserv.deleteAdmin(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        });
  }

  updateAdmin(id: number){
    this.router.navigate(['/updateAdmin', id]);
    
    
  }

}
