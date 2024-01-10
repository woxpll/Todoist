import {FormControl} from "@angular/forms";

export interface ITaskForm {
  name: FormControl<string | null | undefined>
  description: FormControl<string | null | undefined>
  category: FormControl<string | null | undefined>
  deadline: FormControl<string | null | undefined>
  priority: FormControl<object | null | undefined>
}
