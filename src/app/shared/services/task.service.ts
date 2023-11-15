import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../interfaces/task";
import {Observable, Subject} from "rxjs";
import {Data} from "../interfaces/data";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataStorage?: Data

  serviceURL: string
  uid$: any = localStorage.getItem("user")

  check(){
    const uid = JSON.parse(this.uid$).uid
    this.http.get<Data>(`${this.serviceURL}/${uid}`).subscribe(data => {
      this.dataStorage = data
    })
  }

  observer: Subject<Task> = new Subject()
  observerEdit: Subject<Task> = new Subject()

  subscriber$: Observable<Task>  = this.observer.asObservable();
  subscriberEdit$: Observable<Task>  = this.observerEdit.asObservable();

  emitData(data: Task) {
    this.observer.next(data);
  }

  emitEditData(data: Task){
    this.observerEdit.next(data)
  }

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

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/users"
  }


}
