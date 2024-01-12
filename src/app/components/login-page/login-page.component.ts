import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ISignForm} from "../../shared/interfaces/isign-form";
import {Redirection} from "../../shared/enums/redirection";
import {Message} from "primeng/api";
import {MESSAGES} from "../../shared/config/constants";
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
        this.messages = [MESSAGES.registered];
      } else if(params["accessDenied"]){
        this.messages = [MESSAGES.accessDenied];
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
          this.messages = [MESSAGES.wrongEmailOrPassword];
          this.form.reset()
          this.form.enable()
        }
      }
    )
  }
}
