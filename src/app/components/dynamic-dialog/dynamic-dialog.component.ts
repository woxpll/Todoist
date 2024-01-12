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

  public task: Task = {
    idUser: "123",
    idTask: "123",
    name: "123",
    description: "123",
    category: "123",
    deadline: "123",
    priority: {name: "Важно"},
    isDone: false
  }

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
}
