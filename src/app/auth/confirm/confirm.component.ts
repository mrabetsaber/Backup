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
  
    this.router.navigate(['http://localhost:8080/googlesignin']);
  }


}
