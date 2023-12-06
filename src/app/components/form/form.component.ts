import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {ITaskForm} from "../../shared/interfaces/itask-form";
import {TasksEnum} from "../../shared/enums/tasks-enum";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  protected readonly TasksEnum = TasksEnum;

  task!: Task
  uid!: string
  form!: FormGroup
  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<ITaskForm>({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      deadline: new FormControl(null, Validators.required),
      priority: new FormControl(this.priority, Validators.required),
    })
    this.taskService.subscriberUID$.subscribe(next => {
      this.uid = next
    })
  }

  addTask(task: Task){
    this.taskService.addTask(task)
  }

  submit(){
    const {} = this.task = this.form.value
    this.task.isDone = false
    this.task.uid = this.taskService.uid = undefined ? this.uid : this.taskService.uid
    // this.taskService.emitData(this.task)
    this.addTask(this.task)
    this.form.reset()
  }
}
