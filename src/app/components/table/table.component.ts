import {Component, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../shared/services/task.service";
import {Priority} from "../../shared/interfaces/priority";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  task!: Task
  tasks!: Task[]

  formEdit!: FormGroup

  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.formEdit = new FormGroup<any>({
      name: new FormControl("345", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })

  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(next => {
      this.tasks = next
      console.log(next)
    },error => {
      alert(error)
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


  deleteTask(task: Task){
    const index = this.tasks.findIndex(n => n.id === task.id)
    delete this.tasks[index]
    // this.taskService.deleteTask(task).subscribe(next=> {
    //
    // })
  }


  visible: boolean = false;

  showDialog(task: Task) {
    this.visible = true;
    this.editTask(task)
    this.task = task
  }
}
