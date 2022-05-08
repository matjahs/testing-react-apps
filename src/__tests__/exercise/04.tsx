// form testing
// http://localhost:3000/login

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/login";

test("submitting the form calls onSubmit with username and password", async () => {
  let submittedData: Record<string, unknown> = {};

  const handleSubmit = (data: Record<string, unknown>) =>
    (submittedData = data);

  render(<Login onSubmit={handleSubmit} />);

  const username = await screen.getByLabelText(/username/i);
  const password = await screen.getByLabelText(/password/i);

  await userEvent.type(username, "someUsername");
  await userEvent.type(password, "somePassword");

  const submit = await screen.getByRole("button", {name: /submit/i});
  await userEvent.click(submit);

  expect(submittedData).toEqual({
    username: "someUsername",
    password: "somePassword",
  });
});

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
