import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {TaskService} from "../../shared/services/task.service";
import {ITaskForm} from "../../shared/interfaces/itask-form";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {v4 as uuidv4} from "uuid";
import {LocalStorage} from "../../shared/enums/local-storage";
import {PRIORITY} from "../../shared/config/constants";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{

  protected readonly TasksEnum = TasksEnum;
  protected priority:Priority[] = PRIORITY

  protected form: FormGroup = new FormGroup<ITaskForm>({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
  })

  constructor(private taskService: TaskService) {
  }

  protected submit(){
    const task = {
      idUser: localStorage.getItem(LocalStorage.UID)!,
      idTask: uuidv4(),
      name: this.form.value.name,
      description: this.form.value.description,
      category: this.form.value.category,
      deadline: this.form.value.deadline,
      priority: this.form.value.priority,
      isDone: false
    }
    this.taskService.emitData(task)
    this.form.reset()
  }
}
