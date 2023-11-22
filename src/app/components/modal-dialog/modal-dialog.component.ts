import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit{

  @Input()
  task!: Task

  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  formEdit!: FormGroup
  visible: boolean = false;

  constructor(private taskService: TaskService) {
  }
  ngOnInit(): void {
    this.formEdit = new FormGroup<any>({
      name: new FormControl(this.task.name, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      category: new FormControl(this.task.category, Validators.required),
      deadline: new FormControl(this.task.deadline, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
    })
  }

  submitEdit(){
    const status = this.task.status
    const id = this.task.id
    const {} = this.task = this.formEdit.value
    console.log(this.task)
    this.task.uid = this.taskService.uid
    this.task.id = id
    this.task.status = status
    this.visible = false
    this.taskService.emitEditData(this.task)
  }

  showDialog() {
    this.visible = true;
  }

}
