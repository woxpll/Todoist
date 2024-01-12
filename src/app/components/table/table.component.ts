import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy{

  protected readonly TasksEnum = TasksEnum;
  protected tasks: Observable<Task[]> = this.taskService.getAllTask()
  private aSub: Subject<void> = new Subject<void>()

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.subscriberEdit$.pipe(
      takeUntil(this.aSub)
    ).subscribe(data => {
      this.editTask(data)
    })
    this.taskService.subscriberAdd$.pipe(
      takeUntil(this.aSub)
    ).subscribe(data => {
      this.addTask(data)
    })
  }

  private addTask(task: Task){
    this.tasks = this.taskService.addTask(task)
  }

  private editTask(taskEdit: Task){
    this.tasks = this.taskService.editTask(taskEdit)
  }

  protected deleteTask(task: Task){
    this.tasks = this.taskService.deleteTask(task)
  }

  protected doneTask(task: Task){
    this.tasks = this.taskService.doneTask(task)
  }

  ngOnDestroy(): void {
    this.aSub.next()
    this.aSub.unsubscribe()
  }
}
