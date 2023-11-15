import {Component, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../shared/services/task.service";
import {Priority} from "../../shared/interfaces/priority";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  task!: Task
  tasks!: Task[]


  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.taskService.subscriber$.subscribe(data => {
      this.tasks.push(data)
    });
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(next => {
      this.tasks = next
      console.log(next)
    },error => {
      alert(error)
    })
  }

  deleteTask(task: Task){
    const index = this.tasks.findIndex(n => n.id === task.id)
    delete this.tasks[index]
    // this.taskService.deleteTask(task).subscribe(next=> {
    //
    // })
  }
}
