import React from "react";
import ReactDOM from "react-dom/client";
import { Appointment } from "../src/Appointment";
import { act } from "react-dom/test-utils";

let container;

// Shared variables can be initialized at the beginning of a test
// This will be available to my test when it executes.
beforeEach(() => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
});

describe("Appointment", () => {
  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain("Jordan");
  });
});

/* The it in the function name refers to the noun you 
used to name your test suite

Starting in React 18, the render function is asynchronous: 
the function call will return before React has modified the DOM. 
Therefore, the expectation will run before the DOM is modified.

React provides a helper function for our tests that pauses until 
asynchronous rendering has completed. It’s called act and you simply 
need to wrap it around any React API calls. 
 */
