import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { BackupListService } from 'src/app/service/admin/management/backup-list.service';
import { Observable } from 'rxjs';
import { File1 } from 'src/app/orm/file';



@Component({
  selector: 'app-chartcomponnent',
  templateUrl: './chartcomponnent.component.html',
  styleUrls: ['./chartcomponnent.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ChartcomponnentComponent implements OnInit {
  file!: File1[];
  dataFrom=[ 65, 59, 80, 81, 56, 55, 40 ]
  chartForm = new FormGroup({
    'client': new FormControl(null, Validators.required),
    'dateFrom': new FormControl(Date(), Validators.required),
    'dateTo': new FormControl(Date(), Validators.required),
    
  });
  day = new Date(this.chartForm.value.dateFrom);
  month:number = new Date(this.chartForm.value.dateFrom).getMonth();
  year: number = new Date(this.chartForm.value.dateFrom).getFullYear();
  maDate = new Date();
 

  constructor(private backup: BackupListService,private  datePipe: DatePipe ) {

    
 }
  admins!: Observable<File1[]>;
  dataSource!: any;

  ngOnInit(): void {
    this.reloadData()
  }
  chooseFolder(id:any) {
    
    this.getFiles(id);
  }
  getFiles(id: String) {
    this.file = [];
    let files = this.backup.getDriveBackupFileList(id);
    files.forEach(b => {
      this.file = b;
      console.log(b);
      
    });
  }
  dateFrom() {
      let dataFrom1: number[]=[]
    this.file.forEach(files => {
     
      let a = this.datePipe.transform(files.createdTime.value, 'dd/MM/yyyy')
      let b = this.datePipe.transform(this.chartForm.value.dateFrom, 'dd/MM/yyyy')
      if (a == b) {
        dataFrom1.push(files.size)
        
        
    }
      
      

      
    })
    if (dataFrom1 != []) {
      this.barChartData.datasets[0].data = dataFrom1
      this.chart?.update();
      console.log("a");
      
    }
    
  }
  dateTo() {
    let dataFrom1: number[]=[]
  this.file.forEach(files => {
   
    let a = this.datePipe.transform(files.createdTime.value, 'dd/MM/yyyy')
    let b = this.datePipe.transform(this.chartForm.value.dateTo, 'dd/MM/yyyy')
    if (a == b) {
      dataFrom1.push(files.size)
      
      
  }
    
    

    
  })
  if (dataFrom1 != []) {
    this.barChartData.datasets[1].data = dataFrom1
    this.chart?.update();
    console.log("a");
    
  }
  
}
  reloadData() {
    
    this.admins = this.backup.getDriveBackupFolderList();
    this.admins.forEach(b => {
      this.dataSource = b
      console.log(b);
      
     
    })
    
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    // if (view === 'month') {
    //   const date = cellDate.getDate();

    //   // Highlight the 1st and 20th day of each month.
    //   return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    // }

    return '';
  };


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: this.dataFrom, label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
   // console.log(event, active);
  }

  public randomize(): void {
  //   // Only Change 3 values
  this.barChartData.datasets[0].data = this.dataFrom
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     Math.round(Math.random() * 100),
  //     56,
  //     Math.round(Math.random() * 100),
  //     40 ];

    this.chart?.update();

  //   console.log(this.chartForm.value.date);
  //   Date.now()
  //  let  todayNumber: string = Date();
  // let todayDate : number  = new Date(1647089644468).getDate();
  // let todayString : number =  Date.now();
  // let todayISOString : string = new Date().toISOString();
    
    
    console.log(this.dataFrom);
    
    
  }

}
