import { BackupListComponent } from './Management/backup-list/backup-list.component';
import { ChartcomponnentComponent } from './Management/chartcomponnent/chartcomponnent.component';
import { AdminManagementDashboardComponent } from './Management/admin/admin-management-dashboard/admin-management-dashboard.component';
import { AdminListComponent } from './Management/admin/admin-list/admin-list.component';
import { UserListComponent } from './Management/user/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateAdminComponent } from './Management/admin/update-admin/update-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user', component: UserListComponent},
      {
        path: 'adminList', component: AdminManagementDashboardComponent, children: [
          { path: '', component: AdminListComponent },
          {path: 'updateAdmin/:id', component: UpdateAdminComponent}
        ]
      },
      { path: 'backups', component: BackupListComponent},
      {path: 'chart', component: ChartcomponnentComponent},
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
