import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  task!: Task
  tasks!: Task[]

  form!: FormGroup

  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
    })
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(res => {
      this.tasks = res
      console.log(res)
    },error => {
      alert(error)
    })
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe(next => {

    })
  }

  submit(){
    const {name, description, category, deadline, priority, status = false} = this.task = this.form.value
    console.log(status)
    console.log(this.task)
    this.tasks.push({name,description, category, deadline, priority, status})
    // this.addTask(this.task)

  }

}
