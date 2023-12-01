import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ISignForm} from "../../shared/interfaces/isign-form";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy{

  form!: FormGroup
  aSub!: Subscription

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<ISignForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(["/login"],{
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
    // this.auth.signUpWithEmailAndPassword(this.form.value.email, this.form.value.password).then(() => {
    //   this.router.navigate(["/login"], {
    //     queryParams: {
    //       registered: true
    //     }
    //   })
    //   console.log("Success")
    // }).catch((error) => {
    //   console.warn(error)
    //   this.form.enable()
    // })
  }
}
