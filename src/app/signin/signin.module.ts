import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SigninPageRoutingModule,
    FormsModule,
    NgOtpInputModule
  ],
  declarations: [SigninPage, OtpComponent]
})
export class SigninPageModule {}
