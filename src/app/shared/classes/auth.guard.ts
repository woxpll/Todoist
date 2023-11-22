import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn ? true : inject(Router).navigate(["/login"], {
    queryParams: {
        accessDenied: true
    }
  })
}
