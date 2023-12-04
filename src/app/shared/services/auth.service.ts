import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {


  users!: User[]
  constructor(
    private router: Router
  ) {
    this.users =[]

    if (localStorage.getItem("user")){
      this.users = JSON.parse(localStorage.getItem("user")!)
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
    localStorage.setItem("user", JSON.stringify(this.users))
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!); // TODO: никаких non-null assertion, ошибки проверки типов твои друзья, а не враги. Используй type guard механизм.
    return user !== null;
  }

  logout() {
    localStorage.removeItem('task'); //TODO: текстовые константы выноси в отдельных файл, тогда сможешь менять их в одном месте в проекте и уменьшить количество ошибок из-за переименований
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
