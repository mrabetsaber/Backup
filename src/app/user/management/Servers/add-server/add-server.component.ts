import { Server } from './../../../../orm/Server';
import { ServerService } from './../../../../service/Server/server.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


interface DB {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {

  copyMessage(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =this.addUserCommandLine1+this.addUserCommandLine2+this.addUserCommandLine3+this.addUserCommandLine4;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  showfield = true;
  url:any
  show() {
    this.showfield =true;
  }
  show1() {
    this.showfield =false;
  }


 
  dbs: DB[] = [
    {value: 'MySQL', viewValue: 'MySQL'},
    {value: 'PostgreSQL', viewValue: 'PostgreSQL'},
    {value: 'TimescaleDB', viewValue: 'TimescaleDB'},
    {value: 'MongoDB', viewValue: 'MongoDB'},
    {value: 'MariaDB', viewValue: 'MariaDB'},
    {value: 'Percona', viewValue: 'Percona'},
  ];
  showFiller = false;
  isLinear = false;
  firstFormGroup=new FormGroup({});
  secondFormGroup = new FormGroup({});
  existUserFormGroup=new FormGroup({});
  addUserCommandLine1: string = "";
  addUserCommandLine2: string = "";
  addUserCommandLine3: string = "";
  addUserCommandLine4: string = "";
  server: Server = new Server();
  constructor(private _formBuilder: FormBuilder,private serverService:ServerService,private router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      path: ['', Validators.required],
      name: ['', Validators.required],
      clientName:['',Validators.required]
    });
    
    this.secondFormGroup = this._formBuilder.group({
      cPassword: ['123456', Validators.required],
      cUserName: ['s9s',Validators.required],
      ePassword: ['123456',Validators.required],
      eUserName: ['s9s', Validators.required],
    });
    this.existUserFormGroup = this._formBuilder.group({
      
    });


    
  }
  changed() {
    
    console.log('hi');
    
    this.clickb();

  }
  clickb() {
    console.log(this.firstFormGroup.value.type);
    switch (this.firstFormGroup.value.type) {
      
      case "MySQL":
        this.addUserCommandLine1 = "CREATE USER '"+this.secondFormGroup.value.cUserName+"'@'127.0.0.1' IDENTIFIED BY '"+this.secondFormGroup.value.cPassword+"';";
        this.addUserCommandLine2 = "GRANT ALL ON *.* TO '"+this.secondFormGroup.value.cUserName+"'@'127.0.0.1';";
        this.addUserCommandLine3 = "";
        this.addUserCommandLine4 = "";
        break;
      case "PostgreSQL":
        this.addUserCommandLine1 = "CREATE USER"+this.secondFormGroup.value.cUserName+" WITH PASSWORD '"+this.secondFormGroup.value.cPassword+"' LOGIN";
        this.addUserCommandLine2 = "GRANT SELECT ON ALL TABLES IN SCHEMA public TO "+this.secondFormGroup.value.cUserName+";";
        this.addUserCommandLine3 = "GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO "+this.secondFormGroup.value.cUserName+";";
        this.addUserCommandLine4 = "ALTER ROLE "+this.secondFormGroup.value.cUserName+" WITH SUPERUSER;";
        break;
      case "TimescaleDB":
        this.addUserCommandLine1 = "CREATE USER "+this.secondFormGroup.value.cUserName+" WITH PASSWORD '"+this.secondFormGroup.value.cPassword+"' LOGIN;";
        this.addUserCommandLine2 = "GRANT SELECT ON ALL TABLES IN SCHEMA public TO "+this.secondFormGroup.value.cUserName+";";
        this.addUserCommandLine3 = "GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO "+this.secondFormGroup.value.cUserName+";";
        this.addUserCommandLine4 = "ALTER ROLE "+this.secondFormGroup.value.cUserName+" WITH SUPERUSER;";
        break;
      case "MongoDB":
        this.addUserCommandLine1 = "use admin;";
        this.addUserCommandLine2 = `db.createRole({role: "`+this.secondFormGroup.value.cUserName+`BackupRole", privileges: [{resource: { anyResource: true}, actions: ["anyAction"]}], roles: [], writeConcern: { w: "majority"}});`;
        this.addUserCommandLine3 = `db.createUser({user: "`+this.secondFormGroup.value.cUserName+`", pwd: ""+this.secondFormGroup.value.cPassword+"", roles: ["backup", "restore", "s9sBackupRole"], writeConcern: { w: "majority"}});`;
        this.addUserCommandLine4=""
        break;
      case "MariaDB":
        this.addUserCommandLine1 = "CREATE USER '"+this.secondFormGroup.value.cUserName+"'@'localhost' IDENTIFIED BY '"+this.secondFormGroup.value.cPassword+"';";
        this.addUserCommandLine2 = "GRANT ALL ON *.* TO '"+this.secondFormGroup.value.cUserName+"'@'localhost';";
        this.addUserCommandLine3 = "";
        this.addUserCommandLine4 = "";
        break;
      case "Percona":
        this.addUserCommandLine1 = "CREATE USER '"+ this.secondFormGroup.value.cUserName +"'@'localhost' IDENTIFIED BY '"+this.secondFormGroup.value.cPassword+"';";
        this.addUserCommandLine2 = "GRANT ALL ON *.* TO '"+this.secondFormGroup.value.cUserName +"'@'localhost';";
        this.addUserCommandLine3 = "";
        this.addUserCommandLine4 = "";
        break;
      
    }
    
  }

  submit() {
    this.server.type = this.firstFormGroup.value.type;
    this.server.path = this.firstFormGroup.value.path;
    this.server.name = this.firstFormGroup.value.name;
    this.server.clientName=this.firstFormGroup.value.clientName;
    if (this.showfield) {
      this.server.userName = this.secondFormGroup.value.cUserName;
      this.server.password = this.secondFormGroup.value.cPassword;
      
    }
    else {
      this.server.userName = this.secondFormGroup.value.eUserName;
      this.server.password = this.secondFormGroup.value.ePassword;
      console.log(this.secondFormGroup.value.eUserName);
      
    }
    console.log(this.server);
    
  // this.serverService.createServer(this.server).subscribe();
  //   this.router.navigate(['/user']);
    
  }
}
