import classNames from "classnames"
import { memo } from "react"
import { Todo as ITodo } from "../../../interfaces/todo"
import { getTodoColorByPriority } from "../../../utils/todo"
import { Btn } from "./Btn"

export const Todo = memo(
  ({
    todo,
    onDone,
    onDelete,
  }: {
    todo: ITodo
    onDelete: (id: string) => void
    onDone: (id: string) => void
  }) => {
    return (
      <li
        className={classNames(
          "text-white my-3",
          getTodoColorByPriority(todo.priority),
          {
            "bg-opacity-50": todo.isDone,
          },
        )}
      >
        <div className="w-full inline-flex pl-5 pr-3 py-2 mr-2 text-sm font-medium rounded justify-between">
          <span
            className={classNames({
              "line-through decoration-gray-50 bg-opacity-30 text-opacity-30":
                todo.isDone,
            })}
          >
            {todo.label}
          </span>
          <span>
            {!todo.isDone && (
              <Btn aria-label="Mark as done" onClick={() => onDone(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>

                <span className="sr-only">Mark as done</span>
              </Btn>
            )}

            <Btn aria-label="Remove" onClick={() => onDelete(todo.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Remove</span>
            </Btn>
          </span>
        </div>
      </li>
    )
  },
)
