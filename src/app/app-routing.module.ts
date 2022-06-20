import { NotauthorizedComponent } from './auth/notauthorized/notauthorized.component';
import { SucessComponent } from './auth/sucess/sucess.component';

import { ConfirmComponent } from './auth/confirm/confirm.component';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { GardGuard } from './gards/gard.guard';
import { AdminGuard } from './gards/admin.guard';

const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm/:token', component:ConfirmComponent},
  { path: 'sucessRegister', component: SucessComponent },
  { path: 'notauthorized', component: NotauthorizedComponent },
  
  {
    
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
    import('./admin/admin.module').then((m) => m.AdminModule),
  },
  
  {
    
    path: 'user',
    canActivate: [GardGuard],
    
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: NotFoundComponent },
];

  
  
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
