import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', //TODO: если сервис в shared, он не должен быть providedIn: 'root'. Это side effect о котором я не узнаю пока сюда не зайду. Декларируй его в провайдерах app.module явно
})
export class AuthService {
  userData: any; //TODO: any самый небезопасный тип, неиспользуем его вообще. Unknown лучше, но если можешь типизировать - сделай

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.firebaseAuthenticationService.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        alert(error.message); //TODO: замени вывод страшных alert`ов на snackbar из angular material
      });
  }
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!); // TODO: никаких non-null assertion, ошибки проверки типов твои друзья, а не враги. Используй type guard механизм.
    return user !== null;
  }

  logout() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('task'); //TODO: текстовые константы выноси в отдельных файл, тогда сможешь менять их в одном месте в проекте и уменьшить количество ошибок из-за переименований
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
