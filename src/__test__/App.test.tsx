/**
 * Module for testing the entire app
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("App should render home screen by default", async () => {
  render(<App />);
  const ctaButton = screen.getByText(/Go to Control Panel/i);
  expect(ctaButton).toBeInTheDocument();
});

test("App CTA button should redirect to control panel multiple tabs screen", async () => {
  render(<App />);
  const ctaButton = screen.getByText(/Go to Control Panel/i);
  userEvent.click(ctaButton);
  expect(await screen.findByText(/TABS/i)).toBeInTheDocument();
});

test("top bar control panel link should redirect to control panel's multiple tabs screen", async () => {
  render(<App />);
  const controlPanelMenuItem = screen.getByAltText(/control panel/i);
  userEvent.click(controlPanelMenuItem);
  expect(await screen.findByText(/TABS/i)).toBeInTheDocument();
});
