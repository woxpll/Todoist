import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ISignForm} from "../../shared/interfaces/isign-form";
import {Redirection} from "../../shared/enums/redirection";
import {Message} from "primeng/api";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy{

  protected form!: FormGroup
  private aSub!: Subscription

  protected messages!: Message[]

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

  protected onSubmit(){
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      value => {
        if (value){
          this.router.navigate(["/login"],{
            queryParams: {
              registered: true
            }
          })
        }else {
          this.messages = [
            { severity: 'error', summary: 'Ошибка', detail: 'Пользаватель уже существует' },
          ];
          this.form.reset()
          this.form.enable()
        }
      }
    )
  }
}
