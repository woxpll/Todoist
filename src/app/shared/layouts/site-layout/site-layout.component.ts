import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


interface Priority{
  name: string
}

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  task!: Task
  tasks!: Task[]

  form!: FormGroup

  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(next => {
      this.tasks = next
      console.log(next)
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
    this.form.reset()
    this.tasks.push({name,description, category, deadline, priority , status})

    console.log(this.tasks)
  }

}
