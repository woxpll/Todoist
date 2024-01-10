import {Priority} from "./priority";

export interface Task {
  uid: string
  id: string
  name: string
  description: string
  category: string
  deadline: string
  priority: Priority
  isDone: boolean
}
