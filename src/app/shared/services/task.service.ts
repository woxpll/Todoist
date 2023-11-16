import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../interfaces/task";
import {Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataStorage : any

  isExists!: boolean

  serviceURL: string
  uid$: any = localStorage.getItem("user")
  uid = JSON.parse(this.uid$).uid

  check() {
    this.http.get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`).subscribe( (data) =>{
        if (data.length === 0){
          this.createNewUser(this.uid)
        }
      }
    )
  }

  observer: Subject<Task> = new Subject()
  observerEdit: Subject<Task> = new Subject()
  observerUID: Subject<string> = new Subject()

  subscriber$: Observable<Task>  = this.observer.asObservable();
  subscriberEdit$: Observable<Task>  = this.observerEdit.asObservable();
  subscriberUID$: Observable<string>  = this.observerUID.asObservable();

  emitData(data: Task) {
    this.observer.next(data);
  }

  emitEditData(data: Task){
    this.observerEdit.next(data)
  }

  emitUIDData(uid: string){
    this.observerUID.next(uid)
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

  createNewUser(uid: string){
    this.emitUIDData(uid)
  }

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
  }
}
