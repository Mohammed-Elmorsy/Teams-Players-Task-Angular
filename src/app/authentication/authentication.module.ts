import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    AuthenticationRoutingModule,

    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ScrollPanelModule
  ]
})
export class AuthenticationModule { }
