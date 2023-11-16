import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../interfaces/task";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataStorage : any

  serviceURL: string
  uid$: any = localStorage.getItem("user")
  uid = JSON.parse(this.uid$).uid

  check(){
    this.http.get(`${this.serviceURL}/?uid=${this.uid}`).subscribe( (data) =>{
        this.dataStorage = data
        console.log(data)
      },
      error => {
        // this.createNewUser(uid).subscribe()
      }
    )
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
    return this.http.get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`)
  }
  deleteTask(task: Task): Observable<Task>{
    return this.http.delete<Task>(`${this.serviceURL}/${task.id}`)
  }
  editTask(task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task)
  }

  // createNewUser(uid: string){
  //   const newUser = new DataUser(uid)
  //   return this.http.post<Data>(this.serviceURL, newUser)
  // }

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }
}
