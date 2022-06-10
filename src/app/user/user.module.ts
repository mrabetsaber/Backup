import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ParametrageBackupListComponent, Update1Component } from './management/ParametrageBackup/parametrage-backup-list/parametrage-backup-list.component';
import { UpdateParametrageBackupComponent } from './management/ParametrageBackup/update-parametrage-backup/update-parametrage-backup.component';
import { AddParametrageBackupComponent } from './management/ParametrageBackup/add-parametrage-backup/add-parametrage-backup.component';
import { ParametrageBackupDashboardComponent } from './management/ParametrageBackup/parametrage-backup-dashboard/parametrage-backup-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ServerListComponent, UpdateServerComponent } from './management/Servers/server-list/server-list.component';
import { AddServerComponent } from './management/Servers/add-server/add-server.component';
import {MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { HistoriqueComponent } from './management/historique/historique.component';
import { AddScheduleComponent } from './management/historique/add-schedule/add-schedule.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    UpdateServerComponent,
    HomeComponent,
    HeaderComponent,
    UserDashboardComponent,
    ParametrageBackupListComponent,
    AddParametrageBackupComponent,
    ParametrageBackupDashboardComponent,
    ServerListComponent,
    AddServerComponent,
    HistoriqueComponent,
    AddScheduleComponent,
    UpdateParametrageBackupComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
