import {Priority} from "./priority";

export interface Task {
  uid: string
  id: number
  name: string
  description: string
  category: string
  deadline: string
  priority: Priority
  status: boolean // TODO: почему статус boolean? Может быть некорректное название свойства
}
