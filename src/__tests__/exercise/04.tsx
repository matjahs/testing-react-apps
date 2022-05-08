// form testing
// http://localhost:3000/login

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/login";
import faker from "faker";
import type {LoginFormValues} from "../../components/login";

function buildLoginForm({username, password}: Partial<LoginFormValues> = {}) {
  return {
    username: username ?? faker.internet.userName(),
    password: password ?? faker.internet.password(),
  };
}

test("submitting the form calls onSubmit with username and password", async () => {
  const {username, password} = buildLoginForm();
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole("button", {name: /submit/i}));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

/*
 eslint
 no-unused-vars: "off",
 @typescript-eslint/no-unused-vars: "off",
 */
