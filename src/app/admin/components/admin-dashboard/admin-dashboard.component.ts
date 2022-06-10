import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentRoute: string;
  constructor(private router: Router,private auth: AuthService) {
    this.currentRoute = "Demo";
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(event);
      }


    });
    
  }
  logout(): void {
    this.auth.logout();
  }
    ngOnInit(): void {
    }
  showFiller = true;

}

