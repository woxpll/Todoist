import {FormControl} from "@angular/forms";

export interface ITaskForm {
  name: FormControl<string | null>
  description: FormControl<string | null>
  category: FormControl<string | null>
  deadline: FormControl<string | null>
  priority: FormControl<object | null>
}
