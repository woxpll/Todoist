import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceURL: string;

  user?: User

  private email: string | null = null;
  private password: string | null = null

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }
  register(user: User): Observable<User>{
    return this.http.post<User>(this.serviceURL, user)
  }

  login(user: User): Observable<User>{
    return this.http.get<User>(`${this.serviceURL}/?email=${user.email}&&?password=${user.password}`)
      .pipe(
        tap(
          (user: User)=>{
            localStorage.setItem("email", user.email)
            localStorage.setItem("password", user.password)
            this.setStorage(user.email, user.password)
          }
        )
      )
  }

  setStorage(arg1: string | null, arg2: string | null){
    this.email = arg1
    this.password = arg2
    console.log(this.email, this.password)
  }

  getStorage(): User {
    return<User> {
      email: this.email,
      password: this.password
    }
  }

  isAuthenticated(): boolean{
    return !!this.email && !!this.password
  }

  logout(){
    this.setStorage(null, null)
    localStorage.clear()
  }

}
