import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../interfaces/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class TaskService {
  serviceURL: string;
  uid = localStorage.getItem('uid')!;
  // uid = JSON.parse(this.uid$);

  tasksStorage!: Task[]
  tasks: Task[]
  check() {
    this.http
      .get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`)
      .subscribe((data) => {
        if (data.length === 0) {
          this.createNewUser(this.uid);
        }
      });
    this.tasksStorage = JSON.parse(localStorage.getItem("tasks")!)
    if (this.tasksStorage.length > 0){
      this.tasks = this.tasksStorage.filter(value => value.uid === this.uid)
    }
  }

  observer: Subject<Task> = new Subject();
  observerEdit: Subject<Task> = new Subject();
  observerUID: Subject<string> = new Subject();

  subscriber$: Observable<Task> = this.observer.asObservable();
  subscriberEdit$: Observable<Task> = this.observerEdit.asObservable();
  subscriberUID$: Observable<string> = this.observerUID.asObservable();

  emitData(data: Task) {
    this.observer.next(data);
  }

  emitEditData(data: Task) {
    this.observerEdit.next(data);
  }

  emitUIDData(uid: string) {
    this.observerUID.next(uid);
  }

  addTask(task: Task) {
    if (this.tasksStorage.length > 0){
      task.id = this.tasksStorage.length + 1
    }else {
      task.id = 0
    }
    console.log(this.tasks)
    this.tasks.push(task)
    this.tasksStorage.push(task)
    localStorage.setItem("user", JSON.stringify(this.tasks))
    localStorage.setItem("users", JSON.stringify(this.tasksStorage))
    console.log(task)
    // return this.http.post<Task>(this.serviceURL, task);
  }
  getAllTask(): Observable<Task[]> {
    const allTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return allTaskSubject$.asObservable()
    // return this.http.get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`);
  }
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.serviceURL}/${task.id}`);
  }
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }

  createNewUser(uid: string) {
    this.emitUIDData(uid);
  }

  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/tasks'; //TODO: такое лучше выносить в environment
    this.tasksStorage = []
    this.tasks = []
  }
}
