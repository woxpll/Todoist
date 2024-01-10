import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {ITaskForm} from "../../shared/interfaces/itask-form";
import {TasksEnum} from "../../shared/enums/tasks-enum";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit{

  @Input()
  public task: Task = Input()
  protected priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]
  protected formEdit: FormGroup = new FormGroup({})

  protected visible: boolean = false;
  protected readonly TasksEnum = TasksEnum;

  constructor(private taskService: TaskService) {
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

  protected submitEdit(){
    const taskEdit = {
      uid: this.taskService.uid,
      id: this.task.id,
      name: this.formEdit.value.name,
      description: this.formEdit.value.description,
      category: this.formEdit.value.category,
      deadline: this.formEdit.value.deadline,
      priority: this.formEdit.value.priority,
      isDone: this.task.isDone
    }
    const status = this.task.isDone
    const id = this.task.id
    const {} = this.task = this.formEdit.value
    console.log(this.task)
    this.task.uid = this.taskService.uid
    this.task.id = id
    this.task.isDone = status
    this.visible = false
  }

  protected showDialog() {
    this.visible = true;
  }
}
