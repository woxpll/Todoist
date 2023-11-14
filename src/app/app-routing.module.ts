import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginPageComponent
      },
      {
        path: "register",
        component: RegisterPageComponent
      }
    ]
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: SiteLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
