import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notauthorized',
  templateUrl: './notauthorized.component.html',
  styleUrls: ['./notauthorized.component.css']
})
export class NotauthorizedComponent implements OnInit {

  constructor(private router: Router){}
  
    
    
  
  

  ngOnInit(): void {
    Swal.fire(
      'Error',
     "user not authorized here ",
      'error'
    ).then(()=> this.router.navigateByUrl('/'))
      
  }

}
