import {FormControl} from "@angular/forms";

export interface ISignForm {
    email: FormControl<string | null>
    password: FormControl<string | null>
}
