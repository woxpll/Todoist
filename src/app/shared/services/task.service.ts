import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../interfaces/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../../environments/environmen";
import {LocalStorage} from "../enums/local-storage";


@Injectable()
export class TaskService{
  serviceURL: string;
  uid!: string

  // uid = JSON.parse(this.uid$);

  tasksStorage: Task[]
  tasks: Task[]

  observer: Subject<Task> = new Subject();
  observerEdit: Subject<Task> = new Subject();
  observerUID: Subject<string> = new Subject();

  subscriber$: Observable<Task> = this.observer.asObservable();
  subscriberEdit$: Observable<Task> = this.observerEdit.asObservable();
  subscriberUID$: Observable<string> = this.observerUID.asObservable();

  constructor(private http: HttpClient) {
    this.serviceURL = environment.apiUrl;
    this.tasksStorage = []
    this.tasks = []
  }

  check() {
    // this.http
    //   .get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`)
    //   .subscribe((data) => {
    //     if (data.length === 0) {
    //       this.createNewUser(this.uid);
    //     }
    //   });
    this.tasksStorage = JSON.parse(localStorage.getItem(LocalStorage.TASKS)!)
    this.uid = localStorage.getItem(LocalStorage.UID)!
    if (this.tasksStorage){
      this.tasks = this.tasksStorage.filter(value => {
        if (value === null){
          return
        }
        return value.uid === this.uid
      })
      console.log(this.tasks)
    }else {
      this.tasksStorage = []
    }
  }

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
    this.tasks.push(task)
    this.tasksStorage.push(task)
    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    // return this.http.post<Task>(this.serviceURL, task);
  }
  getAllTask(): Observable<Task[]> {
    const allTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return allTaskSubject$.asObservable()
    // return this.http.get<Task[]>(`${this.serviceURL}/?uid=${this.uid}`);
  }
  deleteTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(n => {
      if (n.id === null){
        return
      }
      return n.id === task.id
    })
    const indexStorage = this.tasksStorage.findIndex(n => {
      if (n === null){
        return
      }
      return n.id === task.id
    })
    delete this.tasks[index]
    delete this.tasksStorage[indexStorage]

    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))

    const deleteTaskSubject$ = new BehaviorSubject<Task>(task)
    return deleteTaskSubject$.asObservable()
    // return this.http.delete<Task>(`${this.serviceURL}/${task.id}`);
  }
  editTask(taskEdit: Task): Observable<Task> {
    this.tasksStorage = this.tasks = this.tasks.reduce((acc: Task[], task: Task): Task[] => {
      if (task.id === taskEdit.id) {
        return [...acc, {
          uid: taskEdit.uid,
          id: taskEdit.id,
          name: taskEdit.name,
          description: taskEdit.description,
          category: taskEdit.category,
          deadline: taskEdit.deadline,
          priority: taskEdit.priority,
          isDone: taskEdit.isDone
        }]
      }
      return [...acc, task]
    }, [])
    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const editTaskSubject$ = new BehaviorSubject<Task>(taskEdit)
    return editTaskSubject$.asObservable()
    // return this.http.put<Task>(`${this.serviceURL}/${task.id}`, task);
  }

  createNewUser(uid: string) {
    this.emitUIDData(uid);
  }
}
