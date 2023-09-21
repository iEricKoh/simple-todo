import { createContext, Dispatch } from "react"
import { initialState, TodosAction, TodosState } from "../reducers/todos"

export const TodosContext = createContext<TodosState>(initialState)
export const TodosDispatchContext = createContext<Dispatch<TodosAction>>(
  () => null,
)
