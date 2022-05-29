import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router,private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.activeRouter.snapshot.params['token']);
    
    this.auth.confirmUserEmail(this.activeRouter.snapshot.params['token']).subscribe();
    
  }
  
  tackeMeHome(): void{
    
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    else if (this.auth.isLoggedInAsAdmin()) {
      this.router.navigate(['/admin']);
    }
    else if (this.auth.isLoggedInAsStudent()) {
      this.router.navigate(['/student']);

    }
    else if (this.auth.isLoggedInAsTeacher()) {
      this.router.navigate(['/teacher'])
    }
  }


}
