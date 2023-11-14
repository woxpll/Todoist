import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Priority} from "../../shared/interfaces/priority";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  form!: FormGroup
  priority:Priority[] = [{name: "Срочно"}, {name: "Важно"}]

  ngOnInit(): void {

    this.form = new FormGroup<any>({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      deadline: new FormControl(this.priority, Validators.required),
      priority: new FormControl("", Validators.required),
    })
  }


  submit(){
    // const {name, description, category, deadline, priority, status = false} = this.task = this.form.value
    // console.log(name)
    // this.task.status = false
    // console.log(this.task)

    // this.addTask(this.task)
    this.form.reset()
    // this.tasks.push({name,description, category, deadline, priority , status})
  }

}
