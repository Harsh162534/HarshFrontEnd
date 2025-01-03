import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login/login.service';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  providers: [LoginService]
})
export class RegisterModule { }
