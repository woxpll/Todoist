import {Injectable} from '@angular/core';
import {Task} from '../interfaces/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {LocalStorage} from "../enums/local-storage";


@Injectable()
export class TaskService{

  private tasksStorage: Task[]

  observer: Subject<Task> = new Subject();
  subscriberEdit$: Observable<Task> = this.observer.asObservable();
  subscriberAdd$: Observable<Task> = this.observer.asObservable();


  emitData(data: Task){
    console.log(this.observer)
    this.observer.next(data)
  }
  emitEditData(data: Task) {
    console.log(this.observer)
    this.observer.next(data);
  }

  constructor() {
    this.tasksStorage = []
  }

  filterUserTask(){
    this.tasksStorage = JSON.parse(localStorage.getItem(LocalStorage.TASKS)!)
    const uid = localStorage.getItem(LocalStorage.UID)!
    if (this.tasksStorage){
      return this.tasksStorage.filter(value => {
        if (value === null) {
          return
        }
        return value.idUser === uid
      })
    }else {
      return this.tasksStorage = []
    }
  }

  addTask(task: Task) {
    this.tasksStorage.push(task)
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const addTaskSubject$ = new BehaviorSubject<Task[]>(this.filterUserTask())
    return addTaskSubject$.asObservable()
  }

  getAllTask(): Observable<Task[]> {
    const allTaskSubject$ = new BehaviorSubject<Task[]>(this.filterUserTask())
    return allTaskSubject$.asObservable()
  }

  deleteFind(tasks: Task[],task: Task): number{
    return tasks.findIndex(n => {
      if (n.idTask === null) {
        return
      }
      return n.idTask === task.idTask
    })
  }

  deleteTask(task: Task): Observable<Task[]> {
    this.tasksStorage.splice(this.deleteFind(this.tasksStorage, task), 1)
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const deleteTaskSubject$ = new BehaviorSubject<Task[]>(this.filterUserTask())
    return deleteTaskSubject$.asObservable()
  }

  editTaskReduce(tasks: Task[], taskEdit: Task): Task[]{
    return tasks.reduce((acc: Task[], task: Task): Task[] => {
      if (task.idTask === taskEdit.idTask) {
        return [...acc, {
          idUser: taskEdit.idUser,
          idTask: taskEdit.idTask,
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
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const editTaskSubject$ = new BehaviorSubject<Task[]>(this.filterUserTask())
    return editTaskSubject$.asObservable()
  }

  doneTask(task: Task): Observable<Task[]>{
    this.tasksStorage.forEach((taskDone) => {
      taskDone.idTask === task.idTask ? task.isDone = !taskDone.isDone : 0
    })
    localStorage.setItem(LocalStorage.TASKS, JSON.stringify(this.tasksStorage))
    const doneTaskSubject$ = new BehaviorSubject<Task[]>(this.filterUserTask())
    return doneTaskSubject$.asObservable()
  }
}
