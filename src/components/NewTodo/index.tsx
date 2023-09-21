import classNames from "classnames"
import { useContext, useState } from "react"
import { Priority, TodoActionKind } from "../../enums/priority"
import { getTodoColorByPriority } from "../../utils/todo"
import { TodosContext } from "../../hooks/useTodos"

export const NewTodo = () => {
  const [label, setLabel] = useState("")
  const [priority, setPriority] = useState(Priority.Low)

  const { dispatch } = useContext(TodosContext)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (label) {
      dispatch({
        type: TodoActionKind.NEW_TODO,
        payload: {
          label,
          priority,
        },
      })

      setLabel("")
    }
  }

  return (
    <div>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter label"
            aria-label="New todo"
          />
          <div className="w-full px-3">
            <div className="relative text-white">
              <select
                value={priority}
                onChange={(e) => setPriority(+e.target.value as Priority)}
                className={`block appearance-none w-full border py-2 px-4 pr-8 rounded leading-tight focus:outline-none ${getTodoColorByPriority(
                  priority,
                )}`}
              >
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <button
            disabled={label.length === 0}
            className={classNames(
              "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded",
              {
                "opacity-30": label.length === 0,
              },
            )}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
