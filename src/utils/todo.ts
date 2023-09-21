import { Priority } from "../enums/priority"

export const getTodoColorByPriority = (priority: Priority) => {
  switch (priority) {
    case Priority.Low:
      return "bg-teal-400 border-teal-200"
    case Priority.Medium:
      return "bg-orange-400  border-orange-200"
    case Priority.High:
      return "bg-red-400 border-red-200"
  }
}
