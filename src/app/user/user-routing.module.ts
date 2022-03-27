import { AddParametrageBackupComponent } from './management/ParametrageBackup/add-parametrage-backup/add-parametrage-backup.component';
import { AdminDashboardComponent } from './../admin/components/admin-dashboard/admin-dashboard.component';
import { AddServerComponent } from './management/Servers/add-server/add-server.component';
import { UpdateParametrageBackupComponent } from './management/ParametrageBackup/update-parametrage-backup/update-parametrage-backup.component';
import { ParametrageBackupListComponent } from './management/ParametrageBackup/parametrage-backup-list/parametrage-backup-list.component';
import { ParametrageBackupDashboardComponent } from './management/ParametrageBackup/parametrage-backup-dashboard/parametrage-backup-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '', component: UserDashboardComponent, children: [
      { path: '', component: HomeComponent },
      {path:'addParametrageBackup',component:AddParametrageBackupComponent},
      { path: 'ParametrageList', component: ParametrageBackupListComponent },
      { path: 'updateParametrage/:id', component: UpdateParametrageBackupComponent },
      {path:'addServer',component:AddServerComponent},
      { path: '', redirectTo: '/parametrage/home', pathMatch: 'full' },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
