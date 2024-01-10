import {Component, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {TasksEnum} from "../../shared/enums/tasks-enum";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  protected readonly TasksEnum = TasksEnum;

  protected tasks: Task[]

  constructor(private taskService: TaskService) {
    this.tasks = []
  }

  ngOnInit(): void {

    this.taskService.check()
    this.getAllTask()

    this.taskService.subscriberEdit$.subscribe(data => {
      this.editTask(data)
    })
  }

  private getAllTask(){
    this.taskService.getAllTask().subscribe(next => {
      this.tasks = next
    },error => {
      alert(error)
    })
  }

  private editTask(taskEdit: Task){
    this.taskService.editTask(taskEdit).subscribe((data) => {
      this.tasks = data
    })
  }

  protected deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe((data) => {
      this.tasks = data
    })
  }

  protected doneTask(task: Task){
    this.taskService.doneTask(task).subscribe((data) => {
      this.tasks = data
    })
  }
}
