import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AuthService} from "./shared/services/auth.service";
import {TaskService} from "./shared/services/task.service";

import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './components/site-layout/site-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { RippleModule } from 'primeng/ripple'
import {MessagesModule} from "primeng/messages";
import { DynamicDialogComponent } from './components/dynamic-dialog/dynamic-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    FormComponent,
    TableComponent,
    DynamicDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    RippleModule,
    MessagesModule,
  ],
  providers: [
    AuthService,
    TaskService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
