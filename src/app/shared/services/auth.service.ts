import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceURL: string;
  private token = null

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }
  register(){

  }

  login(user: User): Observable<User>{
    return this.http.post<User>(this.serviceURL, user)
      .pipe(
        tap(
          (user)=>{
            // localStorage.setItem("auth")
          }
        )
      )
  }

  logout(){
    localStorage.clear()
  }

}
