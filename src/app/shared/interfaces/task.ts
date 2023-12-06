import {Priority} from "./priority";

export interface Task {
  uid: string
  id: number
  name: string
  description: string
  category: string
  deadline: string
  priority: Priority
  isDone: boolean
}
