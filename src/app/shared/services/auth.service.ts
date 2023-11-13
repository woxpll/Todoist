import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }
  register(){

  }

  login(user: User): Observable<User>{
    return this.http.post<User>(this.serviceURL, user)
  }


}
