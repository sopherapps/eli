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

test("every time the control panel plus icon is clicked, a new tab should be created, even in tabbar", async () => {
  render(<App />);
  await goToControlPanel();
  const plusButton = screen.getByAltText(/Create New Tab/i);
  userEvent.click(plusButton);
  const CardHeaderInput = await screen.findByDisplayValue(/New Tab/i);
  const tabBarLink = screen.getByText(/New Tab/i);
  expect(CardHeaderInput).toBeInTheDocument();
  expect(tabBarLink).toBeInTheDocument();
});

test("x icon on each tab card should remove the tab, even in tabbar", async () => {
  const tabs = ["first", "second", "third", "fourth"];

  render(<App />);
  await goToControlPanel();
  await addTabsTopToBottom(tabs);

  const closeButtons = await screen.findAllByAltText(/close/i);
  for (let i = 0; i < tabs.length; i++) {
    const displayValue = tabs[i];
    // the tab header
    expect(screen.getByDisplayValue(displayValue)).toBeInTheDocument();
    // the tab menu item
    expect(screen.getByText(displayValue)).toBeInTheDocument();
    userEvent.click(closeButtons[i]);
    // the tab header
    expect(screen.queryByDisplayValue(displayValue)).toBeNull();
    // the tab menu item
    expect(screen.queryByText(displayValue)).toBeNull();
  }
});
test("edit icon on each tab card should open the single tab edit screen for tab", async () => {
  const tabs = ["first", "second", "third", "fourth"];

  render(<App />);
  await goToControlPanel();
  await addTabsTopToBottom(tabs);

  for (let i = 0; i < 4; i++) {
    await goToControlPanel();

    const editButtons = await screen.findAllByAltText(/edit/i);
    userEvent.click(editButtons[i]);

    expect(
      await screen.findByText(new RegExp(`TAB: ${tabs[i]}`, "i"))
    ).toBeInTheDocument();
  }
});

/**
 * Utility to go to the control panel after rendering app
 */
async function goToControlPanel() {
  const controlPanelMenuItem = screen.getByAltText(/^control panel$/i);
  userEvent.click(controlPanelMenuItem);
  await screen.findByText(/TABS/i);
}

/**
 * Adds tabs to the app on the multitab control panel page
 * @param tabs - list of tabs to add in order from top to bottom
 */
async function addTabsTopToBottom(tabs: string[]) {
  const plusButton = screen.getByAltText(/Create New Tab/i);

  for (let tabName of tabs.slice().reverse()) {
    userEvent.click(plusButton);
    const newTabInput = await screen.findByDisplayValue(/New Tab/i);
    userEvent.clear(newTabInput);
    userEvent.type(newTabInput, tabName);
  }
}
