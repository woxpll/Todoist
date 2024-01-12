import {Injectable} from '@angular/core';
import {Task} from '../interfaces/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {LocalStorage} from "../enums/local-storage";


@Injectable()
export class TaskService{

  private tasksStorage: Task[]
  private tasks: Task[]

  observerEdit: Subject<Task> = new Subject();
  subscriberEdit$: Observable<Task> = this.observerEdit.asObservable();

  emitEditData(data: Task) {
    this.observerEdit.next(data);
  }

  constructor() {
    this.tasksStorage = []
    this.tasks = []
  }

  addTask(task: Task) {
    this.tasks.push(task)
    this.tasksStorage.push(task)
    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
  }

  getAllTask(): Observable<Task[]> {
    this.tasksStorage = JSON.parse(localStorage.getItem(LocalStorage.TASKS)!)
    const uid = localStorage.getItem(LocalStorage.UID)!
    if (this.tasksStorage){
      this.tasks = this.tasksStorage.filter(value => {
        if (value === null){
          return
        }
        return value.uid === uid
      })
    }else {
      this.tasksStorage = []
    }
    const allTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return allTaskSubject$.asObservable()
  }

  deleteFind(tasks: Task[],task: Task): number{
    return tasks.findIndex(n => {
      if (n.id === null) {
        return
      }
      return n.id === task.id
    })
  }

  deleteTask(task: Task): Observable<Task[]> {
    this.tasks.splice(this.deleteFind(this.tasks, task), 1)
    this.tasksStorage.splice(this.deleteFind(this.tasksStorage, task), 1)

    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))

    const deleteTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return deleteTaskSubject$.asObservable()
  }

  editTaskReduce(tasks: Task[], taskEdit: Task): Task[]{
    return tasks.reduce((acc: Task[], task: Task): Task[] => {
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
  }
  editTask(taskEdit: Task): Observable<Task[]> {
    this.tasksStorage = this.editTaskReduce(this.tasksStorage, taskEdit)
    this.tasks = this.editTaskReduce(this.tasks, taskEdit)
    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const editTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return editTaskSubject$.asObservable()
  }

  doneTask(task: Task): Observable<Task[]>{
    this.tasksStorage.forEach((taskDone) => {
      taskDone.id === task.id ? task.isDone = !taskDone.isDone : 0
    })
    localStorage.setItem(LocalStorage.TASK, JSON.stringify(this.tasks))
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const doneTaskSubject$ = new BehaviorSubject<Task[]>(this.tasks)
    return doneTaskSubject$.asObservable()
  }
}
