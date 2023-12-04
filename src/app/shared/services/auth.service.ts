import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import {LocalStorage} from "../enums/local-storage";
import {Redirection} from "../enums/redirection";

@Injectable()
export class AuthService {

  users!: User[]
  constructor(
    private router: Router
  ) {
    this.users =[]

    if (localStorage.getItem(LocalStorage.USERS)){
      this.users = JSON.parse(localStorage.getItem(LocalStorage.USERS)!)
      console.log(this.users)
    }
  }

  login(user: User){
    const userData: User | undefined = this.users.find(value => value.email = user.email)
    if(userData?.password === user.password){
      console.log(1)
    }
  }

  register(user: User){
    user.id = uuidv4()
    this.users.push(user)
    localStorage.setItem(LocalStorage.USERS, JSON.stringify(this.users))
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(LocalStorage.USERS)!); // TODO: никаких non-null assertion, ошибки проверки типов твои друзья, а не враги. Используй type guard механизм.
    return user !== null;
  }

  logout() {
    localStorage.removeItem(LocalStorage.TASKS);
    localStorage.removeItem(LocalStorage.USERS);
    this.router.navigate([Redirection.LOGIN]);
  }
}
