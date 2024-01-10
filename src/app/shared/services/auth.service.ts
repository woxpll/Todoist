import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import {LocalStorage} from "../enums/local-storage";
import {Redirection} from "../enums/redirection";
import {Observable, of} from "rxjs";

@Injectable()
export class AuthService {

  protected users: User[]
  constructor(
    private router: Router
  ) {
    this.users =[]

    if (localStorage.getItem(LocalStorage.USERS)){
      this.users = JSON.parse(localStorage.getItem(LocalStorage.USERS)!)
    }
  }

  login(user: User): Observable<boolean>{
    const userData: User | undefined = this.users.find(value => value.email === user.email)
    if(userData?.password === user.password){
      localStorage.setItem(LocalStorage.UID, userData.id)
      return of(true)
    }else {
      return of(false)
    }
  }

  register(user: User): Observable<boolean>{
    const userData: User | undefined = this.users.find(value => value.email === user.email)
    if (userData === undefined){
      user.id = uuidv4()
      this.users.push(user)
      localStorage.setItem(LocalStorage.USERS, JSON.stringify(this.users))
      return of(true)
    }else {
      return of(false)
    }
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem(LocalStorage.UID);
    return !!user;
  }

  logout() {
    localStorage.removeItem(LocalStorage.UID);
    localStorage.removeItem(LocalStorage.TASK);
    this.router.navigate([Redirection.LOGIN]);
  }
}
