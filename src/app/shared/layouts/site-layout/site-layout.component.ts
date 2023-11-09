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


  tasks!: Task[]

  form!: FormGroup

  addTaskValue: string = ""
  addDescriptionValue: string = ""

  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
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

  addTask(){

  }

  submit(){
    const {name, description} = this.form.value
    console.log(name)
    this.tasks.push({name,description})
    console.log(this.tasks)
  }

}
