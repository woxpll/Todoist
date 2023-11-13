import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


interface Priority{
  name: string
}

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  task!: Task
  tasks!: Task[]

  form!: FormGroup
  formEdit!: FormGroup


  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  constructor(private taskService: TaskService) { }



  ngOnInit(): void {
    this.tasks = []
    this.getAllTask()

    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })
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
    const index = this.tasks.findIndex(n => n.id === this.task.id)
    const status = this.task.status
    const id = this.task.id
    const {name, description, category, deadline, priority} = this.task = this.formEdit.value
    this.task.id = id
    this.task.status = status

    // @ts-ignore
    this.tasks = this.tasks.reduce((acc, task: Task)=>{
      // @ts-ignore
      if(task.id === index){
        console.log(155555)
        return [...acc, {id: this.task.id ,name: name, description: description, category: category, deadline: deadline, priority: priority, status: this.task.status }]
      }
      return [...acc, task]
    },[])

    this.visible = false
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe(next => {

    })
  }

  deleteTask(task: Task){
    const index = this.tasks.findIndex(n => n.id === task.id)
    delete this.tasks[index]
    // this.taskService.deleteTask(task).subscribe(next=> {
    //
    // })
  }

  submit(){
    const {name, description, category, deadline, priority, status = false} = this.task = this.form.value
    console.log(name)
    this.task.status = false
    console.log(this.task)

    // this.addTask(this.task)
    this.form.reset()
    this.tasks.push({name,description, category, deadline, priority , status})

  }

  visible: boolean = false;

  showDialog(task: Task) {
    this.visible = true;
    this.editTask(task)
    this.task = task
  }

}
