import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Historique } from 'src/app/orm/historique';
import { HistoriqueService } from 'src/app/service/historique/historique.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  constructor(private hserv:HistoriqueService,private router: Router) { }
  historique!: Observable<Historique[]>;

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.historique = this.hserv.gethistoriqueList();
   
    
  }
  
}
