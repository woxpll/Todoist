import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {Observable, Subject, takeUntil} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicDialogComponent} from "../dynamic-dialog/dynamic-dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DialogService]
})
export class TableComponent implements OnInit, OnDestroy{

  protected readonly TasksEnum = TasksEnum;
  protected tasks: Observable<Task[]> = this.taskService.getAllTask()
  private aSub: Subject<void> = new Subject<void>()

  ref: DynamicDialogRef | undefined;

  constructor(private taskService: TaskService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.taskService.subscriberAdd$.pipe(
      takeUntil(this.aSub)
    ).subscribe(data => {
      this.addTask(data)
    })
  }

  editAddDialog(task: Task) {
    this.dialogService.open(DynamicDialogComponent, {
      dismissableMask: true,
      modal: true,
      keepInViewport: true,
      header: 'Измение задачи',
      data: {
        task: task
      }
    }).onClose.pipe(takeUntil(this.aSub))
      .subscribe((result) => {
        if (result){
          this.editTask(result)
        }
      });
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
