import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";

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
    const {name, description, category, deadline, priority} = this.task = this.formEdit.value
    this.task.id = id
    this.task.status = status
    this.visible = false
  }

  showDialog() {
    this.visible = true;
  }

}
