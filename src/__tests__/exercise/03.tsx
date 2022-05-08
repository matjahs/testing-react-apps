// Avoid implementation details
// http://localhost:3000/counter

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../../components/counter";

test("counter increments and decrements when the buttons are clicked", async () => {
  render(<Counter />);

  const decrement = screen.getByRole("button", {name: /decrement/i});
  const increment = screen.getByRole("button", {name: /increment/i});
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  await userEvent.click(increment);

  const message2 = screen.getByText(/current count/i);
  expect(message2).toHaveTextContent("Current count: 1");

  await userEvent.click(decrement);
  const message3 = screen.getByText(/current count/i);
  expect(message3).toHaveTextContent("Current count: 0");
});
