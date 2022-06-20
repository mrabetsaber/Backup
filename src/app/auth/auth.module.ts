import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { SucessComponent } from './sucess/sucess.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';


@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ConfirmComponent,
    SucessComponent,
    NotauthorizedComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
]
})
export class AuthModule { }
