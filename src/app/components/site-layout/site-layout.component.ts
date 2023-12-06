import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent {

  constructor(private authService: AuthService) { }

  protected onLogout(){
    this.authService.logout()
  }
}
