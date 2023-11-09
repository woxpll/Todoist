import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit{

  tasks!: Task[]

  constructor(private taskService: TaskService) {

  }
  ngOnInit(): void {
    this.taskService.getTask().then((data)=>{
      // @ts-ignore
      this.tasks = data
    })
  }

}
