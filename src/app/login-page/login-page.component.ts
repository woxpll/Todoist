import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  form!: FormGroup

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    console.log(1)
    this.auth.login(this.form.value).subscribe(
      () =>{
        console.log("Login success")
      },
      error => {
        console.warn(error)
      }
    )
  }
}
