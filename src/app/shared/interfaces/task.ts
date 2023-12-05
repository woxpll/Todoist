export interface Task {
  uid: string
  id: number
  name: string
  description: string
  category: string
  deadline: string
  priority: {
    // TODO: есть интерфейс Priority почему не переиспользуется?
    name: string
  };
  status: boolean // TODO: почему статус boolean? Может быть некорректное название свойства
}
