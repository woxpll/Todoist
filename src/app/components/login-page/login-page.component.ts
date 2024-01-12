import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ISignForm} from "../../shared/interfaces/isign-form";
import {Redirection} from "../../shared/enums/redirection";
import {Message} from "primeng/api";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{

  protected form: FormGroup = new FormGroup<ISignForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6)])
  })
  private aSub: Subject<void> = new Subject<void>()
  protected messages: Message[] = []

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params["registered"]){
        this.messages = [
          { severity: 'success', summary: 'Успешно', detail: 'Теперь вы можете зайти' },
        ];
      } else if(params["accessDenied"]){
        this.messages = [
          { severity: 'error', summary: 'Ошибка', detail: 'Для начала надо авторизироваться' },
        ];
      }
    })
  }
  ngOnDestroy(): void {
    this.aSub.next()
    this.aSub.unsubscribe()
  }

  protected onSubmit(){
    this.form.disable()
    this.auth.login(this.form.value).pipe(
      takeUntil(this.aSub)
    ).subscribe(
      value => {
        if (value){
          this.router.navigate([Redirection.DASHBOARD])
        }else {
          this.messages = [
            { severity: 'error', summary: 'Ошибка', detail: 'Неправильй email или пароль' },
          ];
          this.form.reset()
          this.form.enable()
        }
      }
    )
  }
}
