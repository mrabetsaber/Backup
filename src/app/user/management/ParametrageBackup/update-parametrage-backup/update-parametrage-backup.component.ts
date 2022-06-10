import { Router } from '@angular/router';
import { ParametrageBackup } from './../../../../orm/ParametrageBackup';
import { ParametrageBackupService } from './../../../../service/ParametrageBackup/parametrage-backup.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/orm/Server';
import { ServerService } from 'src/app/service/Server/server.service';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import Swal from 'sweetalert2';

interface DB {
  value: number;
  viewValue: string;
}
export interface DialogData {
  id: number;
  database: String;
  schedule: String;
  email: String;
  
}
@Component({
  selector: 'app-update-parametrage-backup',
  templateUrl: './update-parametrage-backup.component.html',
  styleUrls: ['./update-parametrage-backup.component.css']
})
export class UpdateParametrageBackupComponent implements OnInit {
  animal!: string;
  name!: string;
  show=false
  openDialog(): void {
    this.backup.clientName = this.firstFormGroup.value.clientName
    this.backup.dataBaseName = this.secondFormGroup.value.dataBaseName;
    this.backup.schedule = this.cron();
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {dataBaseName: this.backup.dataBaseName, schedule: this.backup.schedule,server:this.backup.clientName},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.pserv.createBackup(this.firstFormGroup.value.type, this.backup).subscribe();
        this.router.navigate(['admin']);
        
      }
      
    });
  }

  showSeconds() {
    this.showSecond = true;
    this.showMinute = false;
    this.showHour = false;
    this.showDay = false;
    this.showMonth = false;
  }
  showMinutes() {
    this.showSecond = false;
    this.showMinute = true;
    this.showHour = false;
    this.showDay = false;
    this.showMonth = false;
  }
  showHours() {
    this.showSecond = false;
    this.showMinute = false;
    this.showHour = true;
    this.showDay = false;
    this.showMonth = false;
  }
  showDays() {
    this.showSecond = false;
    this.showMinute = false;
    this.showHour = false;
    this.showDay = true;
    this.showMonth = false;
  }
  showMonths() {
    this.showSecond = false;
    this.showMinute = false;
    this.showHour = false;
    this.showDay = false;
    this.showMonth = true;
  }
  showYears() {
    this.showSecond = false;
    this.showMinute = false;
    this.showHour = false;
    this.showDay = false;
    this.showMonth = false;
  }
 
  dbs: DB[] = [];
  strategies: DB[]= [{value:1,viewValue:"Drive"},{value:2,viewValue:"Email"}];
  server!: Observable<Server[]>;

  reloadData() {
    this.server = this.sserv.getServerList();

    this.server.forEach(b => {
      console.log("the length"+b.length);
      
      b.map(back => {
        
        this.dbs.push({value:back.id,viewValue:back.userName})
      })
     
   })
   
    
  
  }
  showDay = false;
  showMonth = false;
  showSecond = true;
  showHour = false;
  showMinute = false
  time: number[] = [];
  hour: number[] = [];
  day: number[] = [];
  weekNumber: number[] = [];
  month: number[] = [];
  year: number[] = [];
  yearNumber: number[] = [];

  dayString:String[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',]
  monthString: String[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
  dayNumber: number[] = [];
  
  firstFormGroup=new FormGroup({});
  secondFormGroup = new FormGroup({});
  thirdFormGroup = new FormGroup({});
  onchange() {
    if (this.thirdFormGroup.value.strategy==2) {
      this.show = true
      
      console.log(this.thirdFormGroup.value.strategy);
    }
  }


  SecondRadioForm = new FormGroup({});
  EverySecondBetweenForm = new FormGroup({});
  EverySecondStartingForm = new FormGroup({});
  SpecificSecondForm = new FormGroup({});
  MinuteRadioForm = new FormGroup({});
  EveryMinuteBetweenForm = new FormGroup({});
  EveryMinuteStartingForm = new FormGroup({});
  SpecificMinuteForm = new FormGroup({});

  

  MonthRadioForm = new FormGroup({});
  EveryMonthBetweenForm = new FormGroup({});
  EveryMonthStartingForm = new FormGroup({});
  SpecificMonthForm = new FormGroup({});

  HourRadioForm = new FormGroup({});
  EveryHourBetweenForm = new FormGroup({});
  EveryHourStartingForm = new FormGroup({});
  SpecificHourForm = new FormGroup({});

  DayRadioForm = new FormGroup({});
  EveryDayBetweenForm = new FormGroup({});
  EveryDayStartingForm = new FormGroup({});
  EveryDayNumberStartingForm = new FormGroup({});
  SpecificDayForm = new FormGroup({});
  SpecificDayMonthForm = new FormGroup({});
  LastDayMonthForm = new FormGroup({});
  BeforeLastDayMonthForm = new FormGroup({});
  WeekendForm = new FormGroup({});
  WeekDayForm=new FormGroup({});

 
  

  
  constructor( public dialogRef: MatDialogRef<UpdateParametrageBackupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private _formBuilder: FormBuilder,private router: Router,private pserv:ParametrageBackupService,private sserv:ServerService,public dialog: MatDialog) {}

  ngOnInit() {
    this.reloadData()
    for (let i = 0; i < 60; i++) {
      this.time[i] = i;
      
    }
    for (let i = 0; i < 83; i++) {
      this.year[i] = i+1;
      this.yearNumber[i] = 2022+i;
      
    }
    for (let i = 0; i < 5; i++) {
      this.weekNumber[i] = i+1;
      
    }
    for (let i = 0; i < 12; i++) {
      this.month[i] = i+1;
      
    }
    for (let i = 0; i < 24; i++) {
      this.hour[i] = i;
      
    }
    for (let i = 0; i < 7; i++) {
      this.day[i] = i+1;
      
    }
    for (let i = 0; i < 31; i++) {
      this.dayNumber[i] = i+1;
      
    }
    
    this.firstFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      dataBaseName: [this.data.database, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      dataBaseName: ['', Validators.required],
    });
   
    this.thirdFormGroup = this._formBuilder.group({
      strategy: ['', Validators.required],
      email: [this.data.email, [Validators.email]],
    })
    this.SecondRadioForm= this._formBuilder.group({
      SecondRadioControl:['1']
    });
    this.SpecificSecondForm= this._formBuilder.group({
      specificSecond:[0,Validators.required]
    });
    this.EverySecondStartingForm = this._formBuilder.group({
      every: [0, Validators.required],
      starting:[0, Validators.required]
      
    });
    this.EverySecondBetweenForm = this._formBuilder.group({
      everySecond: [0, Validators.required],
      between:[0, Validators.required]
      
    });
    this.MinuteRadioForm= this._formBuilder.group({
      MinuteRadioControl:['1']
    });
    this.SpecificMinuteForm= this._formBuilder.group({
      specificMinute:[0,Validators.required]
    });
    this.EveryMinuteStartingForm = this._formBuilder.group({
      every: [0, Validators.required],
      starting:[0, Validators.required]
      
    });
    this.EveryMinuteBetweenForm = this._formBuilder.group({
      everyMinute: [0, Validators.required],
      between:[0, Validators.required]
      
    });


  
    this.HourRadioForm= this._formBuilder.group({
      HourRadioControl:['1']
    });
    this.SpecificHourForm= this._formBuilder.group({
      specificHour:[0,Validators.required]
    });
    this.EveryHourStartingForm = this._formBuilder.group({
      every: [0, Validators.required],
      starting:[0, Validators.required]
      
    });
    this.EveryHourBetweenForm = this._formBuilder.group({
      everyHour: [0, Validators.required],
      between:[0, Validators.required]
      
    });
    
    this.MonthRadioForm= this._formBuilder.group({
      MonthRadioControl:['1']
    });
    this.SpecificMonthForm= this._formBuilder.group({
      specificMonth:[['January'],Validators.required]
    });
    this.EveryMonthStartingForm = this._formBuilder.group({
      every: [1, Validators.required],
      starting:['January', Validators.required]
      
    });
    this.EveryMonthBetweenForm = this._formBuilder.group({
      everyMonth: ['January', Validators.required],
      between:['January', Validators.required]
      
    });
    this.DayRadioForm= this._formBuilder.group({
      DayRadioControl:['1']
    });
    this.SpecificDayForm= this._formBuilder.group({
      specificDay:[['Sunday'],Validators.required]
    });
    this.SpecificDayMonthForm= this._formBuilder.group({
      specificDayMonth:[[1],Validators.required]
    });
    this.EveryDayStartingForm = this._formBuilder.group({
      every: [1, Validators.required],
      starting:['Sunday', Validators.required]
      
    });
    this.EveryDayNumberStartingForm = this._formBuilder.group({
      every: [1, Validators.required],
      starting:[1, Validators.required]
      
    });
    this.EveryDayBetweenForm = this._formBuilder.group({
      everyDay: [0, Validators.required],
      between:[0, Validators.required]
      
    });
    this.LastDayMonthForm = this._formBuilder.group({
      last: ['Sunday', Validators.required],
      
    });
    this.BeforeLastDayMonthForm = this._formBuilder.group({
      beforeLast: [1, Validators.required],
      
    });
    this.WeekendForm = this._formBuilder.group({
      weekend: [1, Validators.required],
      
    });
    this.WeekDayForm= this._formBuilder.group({
      weekDay: [1, Validators.required],
      weekDayString:['Sunday',Validators.required]
      
    });


    
  }

  
  monthNum(month: any) {
   
    switch (month) {
      case 'January':
        return "1";
      case 'February':
        return "2";
      case 'March':
        return "3"
      case 'April':
        return "4";
      case 'May':
        return "5";
      case 'June':
        return "6";
      case 'July':
        return "7";
      case 'August':
        return "8";
      case 'September':
        return "9";
      case 'October':
        return "10";
      case 'November':
        return "11";
      case 'December':
        return "12";
      default:
        return "";
        
      
      
   }
 }
 

  submi(v:any,v1:any,v2:any,v3:any,v4:any,v5:any) {

    switch (v) {
      case "1":
        return "*"
        
      case "2":
        return v2 + "/" + v1
      case "3":
        return v3
      case "4":
        return v4 + "-" + v5
      default:
        return "";
    }
 
  }
  dayNum(day: any) {
    switch (day) {
      case "Sunday":
        return "1"
      case "Monday":
        return "2";
      case "Tuesday":
        return "3"
      case "Wednesday":
        return "4";
      case "Thursday":
        return "5";
      case "Friday":
        return "6";
      case "Saturday":
        return "7";
      default:
        return "";
    }
  }
  dayStr(day: any) {
    switch (day) {
      case "Sunday":
        return "SUN"
      case "Monday":
        return "MON";
      case "Tuesday":
        return "TUE"
      case "Wednesday":
        return "WED";
      case "Thursday":
        return "THU";
      case "Friday":
        return "FRI";
      case "Saturday":
        return "SAT";
      default:
        return "";
    }
  }
  dayFormat(v:any,v1:any,v2:any,v3:any,v13:any,v14:any,v4:any,v5:any,v6:any,v7:any,v8:any,v9:any,v10:any,v11:any) {
    switch (v) {
      case "1":
        return ["*","*"]
        
      case "2":
        return ["*",this.dayNum(v2) + "/" + v1]
      case "3":
        return [v14+"/"+v13,"*"]
      case "4":
        let specific = (v3 + "").split(',')
        let a="";
        for (let i = 0; i < specific.length; i++) {
          if (i == (specific.length - 1)) {
            a=a+this.dayStr(specific[i])
          } else {
            
            a=a+this.dayStr(specific[i])+","
          }
          
        }
        
        return ["*",a]
      case "5":
        return[v11,"*"]
      case "6":
        return["L","*"]
      case "7":
        return["LW","*"]
      case "8":
        return["*",this.dayNum(v6)+"L"]
      case "9":
        return["L"+"-"+v7,"*"]
      case "10":
        return[v8+"W","*"]
      case "11":
        return["*",this.dayNum(v10)+"#"+v9]
      default:
        return "";
    }
  }
  cron() {
    let v = this.SecondRadioForm.value.SecondRadioControl;
    let v1 =this.EverySecondStartingForm.value.every ;
    let v2 = this.EverySecondStartingForm.value.starting;
    let v3 = this.SpecificSecondForm.value.specificSecond;
    let v4 = this.EverySecondBetweenForm.value.everySecond;
    let v5 = this.EverySecondBetweenForm.value.between;
    
    let second = this.submi(v, v1, v2, v3, v4, v5);
    

    
     v = this.MinuteRadioForm.value.MinuteRadioControl;
     v1 =this.EveryMinuteStartingForm.value.every ;
     v2 = this.EveryMinuteStartingForm.value.starting;
     v3 = this.SpecificMinuteForm.value.specificMinute;
     v4 = this.EveryMinuteBetweenForm.value.everyMinute;
    v5 = this.EveryMinuteBetweenForm.value.between;
    let minute = this.submi(v, v1, v2, v3, v4, v5);

     v = this.MonthRadioForm.value.MonthRadioControl;
     v1 =this.EveryMonthStartingForm.value.every ;
     v2 = this.EveryMonthStartingForm.value.starting;
     v3 = this.SpecificMonthForm.value.specificMonth;
     v4 = this.EveryMonthBetweenForm.value.everyMonth;
    v5 = this.EveryMonthBetweenForm.value.between;
    let month = this.submi(v, v1, v2, v3, this.monthNum(v4),this.monthNum(v5));

     v = this.HourRadioForm.value.HourRadioControl;
     v1 =this.EveryHourStartingForm.value.every ;
     v2 = this.EveryHourStartingForm.value.starting;
     v3 = this.SpecificHourForm.value.specificHour;
     v4 = this.EveryHourBetweenForm.value.everyHour;
    v5 = this.EveryHourBetweenForm.value.between;
    let hour = this.submi(v, v1, v2, v3, v4, v5);

     

    
    
    
    
    v = this.DayRadioForm.value.DayRadioControl;
    v1 =this.EveryDayStartingForm.value.every ;
    v2 = this.EveryDayStartingForm.value.starting;
    v3 = this.SpecificDayForm.value.specificDay;
    v4 = this.EveryDayBetweenForm.value.everyDay;
    v5 = this.EveryDayBetweenForm.value.between;
    let v13 = this.EveryDayNumberStartingForm.value.every;
    let v14 = this.EveryDayNumberStartingForm.value.starting;
    let v6= this.LastDayMonthForm .value.last;
    let v7 =this.BeforeLastDayMonthForm .value.beforeLast ;
    let v8 = this.WeekendForm.value.weekend;
    let v9 = this.WeekDayForm.value.weekDay;
    let v10 = this.WeekDayForm.value.weekDayString;
    let v11 = this.SpecificDayMonthForm.value.specificDayMonth;
    let day=this.dayFormat(v,v1, v2, v3,v13,v14, v4, v5,v6,v7,v8,v9,v10,v11)
    
    
    return second + " " + minute + " " + hour +" "+day[0]+ " " + month + " "+day[1]
    
    
  }
   backup: ParametrageBackup = new ParametrageBackup();
  submit() {
    
    this.backup.clientName = this.firstFormGroup.value.clientName
    this.backup.dataBaseName = this.firstFormGroup.value.dataBaseName;
    this.backup.strategy = this.thirdFormGroup.value.strategy
    this.backup.emailReceiver = this.thirdFormGroup.value.email;
    this.backup.schedule = this.cron();
    let that = this;
    this.pserv.createBackup(this.firstFormGroup.value.type,this.backup).subscribe( {
      complete() {
        Swal.fire('Done...', 'You add the server successfuly', 'success');
        that.router.navigate(['/user']);
    },
      error(err) {
        if (err.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          Swal.fire(
            'Error',
           "network error occurred",
            'error'
          )
          console.error('An error occurred:', err.error,err.status);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          Swal.fire(
            'Error',
           err.message,
            'error'
          )
          console.error(
            `Backend returned code ${err.status}, body was: `, err.error);
        }
      
    
  }});
    
    
    
  }

}


