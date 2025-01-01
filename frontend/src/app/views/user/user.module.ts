import {CommonModule} from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from './signup/signup.component';
import {UserRoutingModule} from './user-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FaIconComponent,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
