import {Priority} from "./priority";

export interface Task {
  idUser: string
  idTask: string
  name: string
  description: string
  category: string
  deadline: string
  priority: Priority
  isDone: boolean
}
