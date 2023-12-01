import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ISignForm} from "../../shared/interfaces/isign-form";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<ISignForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params["registered"]){
        alert("Теперь вы можете зайти")
      } else if(params["accessDenied"]){
        alert("Для начала надо авторизироваться")
      }
    })

    this.auth.getMessage().subscribe(next => {
      console.log(next)
    })
    // if(localStorage.getItem("user") != null){
    //   this.router.navigate(['/dashboard'])
    // }
  }
  ngOnDestroy(): void {
    if (this.aSub){
      // this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(["/dashboard"])
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }
}
