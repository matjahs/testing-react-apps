// simple test with ReactDOM
// http://localhost:3000/counter

import * as ReactDOM from "react-dom";
import Counter from "../../components/counter";
import {act} from "react-dom/test-utils";

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");
  document.body.append(div);

  ReactDOM.render(<Counter />, div);

  const buttons = div.querySelectorAll("button");
  const decrement = buttons.item(0);
  const increment = buttons.item(1);
  const message = div.firstElementChild.querySelector("div");

  expect(message).toHaveTextContent("Current count: 0");
  act(() => increment.click());
  expect(message).toHaveTextContent("Current count: 1");
  act(() => decrement.click());
  expect(message).toHaveTextContent("Current count: 0");

  div.remove();
});

/*
eslint
  no-unused-vars:"off",
  @typescript-eslint/no-unused-vars: "off",
*/
