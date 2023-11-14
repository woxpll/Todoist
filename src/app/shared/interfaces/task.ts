export interface Task{
  id?: number
  name: string
  description: string
  category: string
  deadline: string
  priority: {
    name: string
  }
  status: boolean
}
