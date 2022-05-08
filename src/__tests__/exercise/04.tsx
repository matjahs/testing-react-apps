// form testing
// http://localhost:3000/login

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/login";

test("submitting the form calls onSubmit with username and password", async () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const username = await screen.getByLabelText(/username/i);
  const password = await screen.getByLabelText(/password/i);
  const submit = await screen.getByRole("button", {name: /submit/i});

  await userEvent.type(username, "someUsername");
  await userEvent.type(password, "somePassword");
  await userEvent.click(submit);

  expect(handleSubmit).toHaveBeencalledWith({
    username: "someUsername",
    password: "somePassword",
  });
});

/*
 eslint
 no-unused-vars: "off",
 @typescript-eslint/no-unused-vars: "off",
 */
