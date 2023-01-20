import React from "react";
import ReactDOM from "react-dom/client";
import { Appointment, AppointmentsDayView } from "../src/Appointment";
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

describe("AppointmentsDayView", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });
  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });
  it("renders an li for each appointment", () => {
    const today = new Date();
    // when I deal with I always have to base all events on the same
    // moment in time, rather than asking the system for
    // the current time more than once.
    const twoAppointments = [
      { statsAt: today.setHours(12, 0) },
      { statsAt: today.setHours(13, 0) },
    ];
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });
});
