import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ISignForm} from "../../shared/interfaces/isign-form";
import {Message} from "primeng/api";
import {MESSAGES} from "../../shared/config/constants";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnDestroy{

  protected form: FormGroup = new FormGroup<ISignForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6)])
  })
  private aSub: Subject<void> = new Subject<void>()
  protected messages: Message[] = []

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  protected onSubmit(){
    this.form.disable()
    this.auth.register(this.form.value).pipe(
      takeUntil(this.aSub)
    ).subscribe(
      value => {
        if (value){
          this.router.navigate(["/login"],{
            queryParams: {
              registered: true
            }
          })
        }else {
          this.messages = [MESSAGES.userIsExist];
          this.form.reset()
          this.form.enable()
        }
      }
    )
  }
}
