import { useCallback, useContext } from "react"
import { TodoActionKind } from "../../enums/priority"
import { TodosContext, TodosDispatchContext } from "../../hooks/useTodos"
import { Todo } from "./Todo"

export const Todos = () => {
  const todos = useContext(TodosContext)
  const dispatch = useContext(TodosDispatchContext)

  const dispatchAction = useCallback(
    (type: TodoActionKind.DEL_TODO | TodoActionKind.MARK_AS_DONE, id: string) =>
      dispatch({ type, payload: { id } }),
    [dispatch],
  )

  const handleDelete = useCallback(
    (id: string) => dispatchAction(TodoActionKind.DEL_TODO, id),
    [dispatchAction],
  )

  const handleOnDone = useCallback(
    (id: string) => dispatchAction(TodoActionKind.MARK_AS_DONE, id),
    [dispatchAction],
  )

  return (
    <ul>
      {[...todos]
        .sort((a, b) => b.priority - a.priority)
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onDone={handleOnDone}
          />
        ))}
    </ul>
  )
}
