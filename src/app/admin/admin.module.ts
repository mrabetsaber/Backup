import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddAdminComponent } from './Management/admin/add-admin/add-admin.component';
import { AdminListComponent } from './Management/admin/admin-list/admin-list.component';
import { AdminManagementDashboardComponent } from './Management/admin/admin-management-dashboard/admin-management-dashboard.component';
import { UpdateAdminComponent } from './Management/admin/update-admin/update-admin.component';
import { UserListComponent } from './Management/user/user-list/user-list.component';
import { UpdateUserComponent } from './Management/user/update-user/update-user.component';
import { UserManagementheaderComponent } from './Management/user/user-managementheader/user-managementheader.component';
import { UserManagementDashboardComponent } from './Management/user/user-management-dashboard/user-management-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { BackupListComponent } from './Management/backup-list/backup-list.component';
import { ChartcomponnentComponent } from './Management/chartcomponnent/chartcomponnent.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RestoreDialogComponent } from './Management/shared/restore-dialog/restore-dialog.component';
import { GmailBackupListComponent } from './Management/gmail-backup-list/gmail-backup-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminDashboardComponent,
    AddAdminComponent,
    AdminListComponent,
    AdminManagementDashboardComponent,
    
    UpdateAdminComponent,
    UserListComponent,
    UpdateUserComponent,
    UserManagementheaderComponent,
    UserManagementDashboardComponent,
    SidebarComponent,
    NavbarComponent,
    BackupListComponent,
    ChartcomponnentComponent,
    RestoreDialogComponent,
    GmailBackupListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatTableModule,
    MatTreeModule,
    MatProgressBarModule,
    MatExpansionModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule

  ]
})
export class AdminModule { }
