import { createContext, Dispatch } from "react"
import { initialState, TodosAction, TodosState } from "../reducers/todos"

export const TodosContext = createContext<{
  todos: TodosState
  dispatch: Dispatch<TodosAction>
}>({ todos: initialState, dispatch: () => {} })

TodosContext.displayName = "TodosContext"
