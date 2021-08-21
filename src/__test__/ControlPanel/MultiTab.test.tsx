/**
 * Module for testing the control panel's multi tab screen
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

test("Home page CTA button should redirect to control panel multiple tabs screen", async () => {
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

test("every time the control panel plus icon is clicked, a new tab should be created, even in tabbar", async () => {});

test("Upward arrow on each tab card should move the card upwards, even in tabbar", async () => {});
test("Downward arrow on each tab card should move the card downwards, even in tabbar", async () => {});
test("x icon on each tab card should remove the tab, even in tabbar", async () => {});
test("edit icon on each tab card should open the single tab edit screen for tab", async () => {});
