import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {ITaskForm} from "../../shared/interfaces/itask-form";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  protected readonly TasksEnum = TasksEnum;
  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  protected form: FormGroup = new FormGroup<ITaskForm>({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
  })

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  private addTask(task: Task){
    this.taskService.addTask(task)
  }

  protected submit(){
    const task = {
      uid: this.taskService.uid,
      id: uuidv4(),
      name: this.form.value.name,
      description: this.form.value.description,
      category: this.form.value.category,
      deadline: this.form.value.deadline,
      priority: this.form.value.priority,
      isDone: false
    }
    this.addTask(task)
    this.form.reset()
  }
}
