import { Server } from './../../../orm/Server';
import { Observable } from 'rxjs';
import { ServerService } from './../../../service/Server/server.service';
import { Component, OnInit } from '@angular/core';



interface DB {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  server!: Observable<Server[]>;
  dbs!: DB[];

  constructor(private sserv:ServerService) { }

  ngOnInit(): void {
    this.reloadData()
  }
  
  reloadData() {
    this.server = this.sserv.getServerList();

    this.server.forEach(b => {
      console.log("the length"+b.length);
      
      b.map(back => {
        
      //  this.dbs=[{value:back.id,viewValue:back.type}]
      })
     
   })
   
    
  
  }
  selectedFood = "Select"

 
}
