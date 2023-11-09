import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTaskData(){
    return[
      {
        id: 1,
        name: 2,
        description: 3,
        category: 4,
        deadline: 5,
        priority: 6,
        status: 7
      },
      {
        id: 1,
        name: 2,
        description: 3,
        category: 4,
        deadline: 5,
        priority: 6,
        status: 7
      },
    ]
  }

  getTask(){
    return Promise.resolve(this.getTaskData())
  }
  constructor() { }
}
