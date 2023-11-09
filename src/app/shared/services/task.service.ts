import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../interfaces/task";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  serviceURL: string

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.serviceURL, task)
  }
  getAllTask(): Observable<Task[]>{
    return this.http.get<Task[]>(this.serviceURL)
  }
  deleteTask(task: Task): Observable<Task>{
    return this.http.delete<Task>(`${this.serviceURL}/${task.id}`)
  }
  editTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task)
  }


  getTaskData(){
    return[

    ]
  }

  getTask(){
    return Promise.resolve(this.getTaskData())
  }
  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }


}
