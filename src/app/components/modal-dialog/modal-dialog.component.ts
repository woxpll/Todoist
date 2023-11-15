import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";
import {Task} from "../../shared/interfaces/task";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit{

  task!: Task
  tasks!: Task[]

  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  formEdit!: FormGroup
  visible: boolean = false;

  ngOnInit(): void {
    this.formEdit = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })
  }

  editTask(task: Task){
    this.formEdit.setValue({
      name: task.name,
      description: task.description,
      category: task.category,
      deadline: task.deadline,
      priority: task.priority
    })
  }

  submitEdit(){
    const index: number = this.tasks.findIndex(n => n.id === this.task.id)
    const status = this.task.status
    const id = this.task.id
    const {name, description, category, deadline, priority} = this.task = this.formEdit.value
    this.task.id = id
    this.task.status = status

    this.tasks = this.tasks.reduce((acc: Task[], task: Task): Task[] => {
      if (task.id === index) {
        return [...acc, {
          id: this.task.id,
          name: name,
          description: description,
          category: category,
          deadline: deadline,
          priority: priority,
          status: this.task.status
        }]
      }
      return [...acc, task]
    }, [])

    this.visible = false
  }

  showDialog(task: Task) {
    this.visible = true;
    this.editTask(task)
    this.task = task
  }

}
