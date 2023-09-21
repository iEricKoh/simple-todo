import { useReducer } from "react"
import { TodosContext, TodosDispatchContext } from "../../hooks/useTodos"
import { initialState, todos } from "../../reducers/todos"
import { NewTodo } from "../NewTodo"
import { Todos } from "../Todos"

export const TodosApp = () => {
  const [state, dispatch] = useReducer(todos, initialState)

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        <div className="w-auto max-w-sm m-auto ">
          <NewTodo />
          <Todos />
        </div>
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  )
}
