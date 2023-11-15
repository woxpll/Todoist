import {Task} from "../interfaces/task";

export class DataUser{

  constructor(public id: string, public tasks: Task[] = [{
    name: "",
    description: "",
    category: "",
    deadline: "",
    priority: {
      name: ""
    },
    status: false
  }]) {
  }
}
