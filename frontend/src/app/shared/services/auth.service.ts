import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any

  private token = null

  constructor(private http: HttpClient) {  }

  getMessage(){
    return this.http.get("/api/messages")
  }

  register(user: User){
    return this.http.post<User>("/api/register", user)
  }

  login(user: User): Observable<{ token: string }>{
    return this.http.post<{token : string}>("/api/login", user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem("auth-token", token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: any ){
    this.token = token
  }

  getToken(){
    return this.token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logout(){
    this.setToken(null)
    localStorage.clear()
  }

}
