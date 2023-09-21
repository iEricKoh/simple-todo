import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { NewTodo } from "."
import { Priority } from "../../enums/priority"

describe("New Todo", () => {
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
})
