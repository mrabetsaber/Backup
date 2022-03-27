import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
   
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
