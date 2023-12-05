import {Component, OnInit} from '@angular/core';
import {Task} from "../../shared/interfaces/task";
import {TaskService} from "../../shared/services/task.service";
import {TasksEnum} from "../../shared/enums/tasks-enum";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  protected readonly TasksEnum = TasksEnum;

  task!: Task
  tasks!: Task[]

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.tasks = []
    this.taskService.check()
    this.getAllTask()


    this.taskService.subscriber$.subscribe(data => {
      this.tasks.push(data)
    });
    this.taskService.subscriberEdit$.subscribe(data => {
      this.task = data
      this.editTask(data)
    })
  }

  getAllTask(){
    this.taskService.getAllTask().subscribe(next => {
      console.log(next)
      this.tasks = next
    },error => {
      alert(error)
    })
  }

  editTask(task: Task){
    this.taskService.editTask(task).subscribe(next => {
      console.log(next)
    })
    const index: number = this.tasks.findIndex(n => n.id === task.id)
    this.tasks = this.tasks.reduce((acc: Task[], task: Task): Task[] => {
      if (task.id === index) {
        return [...acc, {
          uid: this.task.uid,
          id: this.task.id,
          name: this.task.name,
          description: this.task.description,
          category: this.task.category,
          deadline: this.task.deadline,
          priority: this.task.priority,
          status: this.task.status
        }]
      }
      return [...acc, task]
    }, [])
  }

  deleteTask(task: Task){
    const index = this.tasks.findIndex(n => n.id === task.id)
    delete this.tasks[index]
    this.taskService.deleteTask(task).subscribe()
  }

  doneTask(task: Task){
    this.task = task
    this.task.status = !this.task.status
  }
}
