import { nanoid } from "nanoid"
import { Priority, TodoActionKind } from "../enums/priority"
import { Todo } from "../interfaces/todo"

export type TodosState = Array<Todo>

export const initialState: TodosState = []

export type TodosAction =
  | {
      type: TodoActionKind.DEL_TODO | TodoActionKind.MARK_AS_DONE
      payload: { id: string }
    }
  | {
      type: TodoActionKind.NEW_TODO
      payload: { label: string; priority: Priority }
    }

export const todos = (
  state: TodosState,
  { type, payload }: TodosAction,
): TodosState => {
  switch (type) {
    case TodoActionKind.NEW_TODO: {
      return [{ ...payload, id: nanoid(), isDone: false }, ...state]
    }

    case TodoActionKind.DEL_TODO:
      return state.filter((todo) => todo.id !== payload.id)

    case TodoActionKind.MARK_AS_DONE:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, isDone: true }
        }
        return todo
      })

    default:
      return state
  }
}
