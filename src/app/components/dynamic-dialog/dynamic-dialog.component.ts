import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {PRIORITY} from "../../shared/config/constants";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITaskForm} from "../../shared/interfaces/itask-form";
import { Task } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit{

  public task: Task = this.dynamicDialogConfig.data.task

  protected readonly TasksEnum = TasksEnum;
  protected readonly priority = PRIORITY;
  protected formEdit: FormGroup = new FormGroup({})

  constructor(public ref: DynamicDialogRef,
              public dynamicDialogConfig: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.formEdit = new FormGroup<ITaskForm>({
      name: new FormControl(this.task.name, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      category: new FormControl(this.task.category, Validators.required),
      deadline: new FormControl(this.task.deadline, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
    })
  }

  submitEdit(){
    const taskEdit = {
      idUser: this.task.idUser,
      idTask: this.task.idTask,
      name: this.formEdit.value.name,
      description: this.formEdit.value.description,
      category: this.formEdit.value.category,
      deadline: this.formEdit.value.deadline,
      priority: this.formEdit.value.priority,
      isDone: this.task.isDone
    }
    this.ref.close(taskEdit);
  }
}
