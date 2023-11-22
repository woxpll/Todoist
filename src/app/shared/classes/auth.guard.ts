import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
    console.log(inject(AuthService).isLoggedIn)
    return inject(AuthService).isLoggedIn ? true : inject(Router).navigate(["/"], {
    queryParams: {
        accessDenied: true
    }
  })
}
