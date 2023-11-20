import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

import {HttpClientModule} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";


import {provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environmen";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire/compat";
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    FormComponent,
    TableComponent,
    ModalDialogComponent
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

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    // error
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
