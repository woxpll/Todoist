import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  task!: Task
  uid!: string
  form!: FormGroup
  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })
    this.taskService.subscriberUID$.subscribe(next => {
      this.uid = next
    })
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe()
  }

  submit(){
    const {} = this.task = this.form.value
    this.task.status = false
    this.task.uid = this.taskService.uid = undefined ? this.uid : this.taskService.uid
    this.taskService.emitData(this.task)
    this.addTask(this.task)
    this.form.reset()
  }

}
