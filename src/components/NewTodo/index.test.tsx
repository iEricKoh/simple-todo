import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { NewTodo } from "."
import { TodosApp } from "../TodosApp"
import { Priority } from "../../enums/priority"

describe("New Todo", () => {
  const todos = [{ label: "todo 1" }, { label: "todo 2" }, { label: "todo 3" }]

  it("should render the UI", () => {
    render(<NewTodo />)

    const submitBtn = screen.getByRole("button", { name: /create/i })

    expect(
      screen.getByRole("textbox", {
        name: /new todo/i,
      }),
    ).toBeInTheDocument()

    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toBeDisabled()
  })

  it("should change input value", () => {
    render(<NewTodo />)

    screen.logTestingPlaygroundURL()

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: "i am todo" } })

    expect(input).toHaveValue("i am todo")
    expect(screen.getByRole("button")).toBeEnabled()
  })

  it("should select correct value on change", async () => {
    const { getByText } = render(<NewTodo />)
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: Priority.High },
    })
    expect((getByText("Low") as HTMLOptionElement).selected).toBeFalsy()
    expect((getByText("Medium") as HTMLOptionElement).selected).toBeFalsy()
    expect((getByText("High") as HTMLOptionElement).selected).toBeTruthy()
  })

  it("should create a new todo item", () => {
    render(<TodosApp />)

    const results = createTodos(todos)

    const nodes = screen.getAllByRole("listitem")

    nodes.forEach((node, index) =>
      expect(node.querySelector("span")).toHaveTextContent(
        results[index].label,
      ),
    )
  })

  it("should delete the todo item", () => {
    render(<TodosApp />)

    createTodos(todos)

    const [, middleNode] = screen.getAllByRole("listitem")

    fireEvent.click(within(middleNode).getByText(/remove/i))

    expect(middleNode).not.toBeInTheDocument()
  })

  it("should mark the todo item as done", () => {
    render(<TodosApp />)

    createTodos(todos)

    const [, middleNode] = screen.getAllByRole("listitem")

    fireEvent.click(within(middleNode).getByText(/mark as done/i))

    expect(middleNode).toHaveClass("bg-opacity-50")
  })
})

function createTodos(todos: Array<{ label: string }>) {
  todos.map((todo) => createTodo(todo.label))

  expect(todos.length).toBe(todos.length)

  return [...todos].reverse()
}

function createTodo(label: string) {
  const input = screen.getByRole("textbox", {
    name: /new todo/i,
  })

  const submit = screen.getByRole("button", { name: /create/i })

  expect(input).not.toHaveValue()
  expect(submit).toBeDisabled()

  fireEvent.change(input, { target: { value: label } })
  expect(input).toHaveValue(label)
  expect(submit).toBeEnabled()

  fireEvent.click(submit)
  expect(input).not.toHaveValue()
  expect(submit).toBeDisabled()
}
