import {Component, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {Observable} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  protected readonly TasksEnum = TasksEnum;
  protected tasks: Observable<Task[]> = this.taskService.getAllTask()

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.subscriberEdit$.subscribe(data => {
      this.editTask(data)
    })
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
}
