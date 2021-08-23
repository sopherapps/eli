/**
 * Module containing utilities fr running tests
 */
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * Utility to go to the control panel after rendering app
 */
export async function goToControlPanel() {
  const controlPanelMenuItem = screen.getByAltText(/^control panel$/i);
  userEvent.click(controlPanelMenuItem);
  await screen.findByText(/TABS/i);
}

/**
 * Adds tabs to the app on the multitab control panel page
 * @param tabs - list of tabs to add in order from top to bottom
 */
export async function addTabsTopToBottom(tabs: string[]) {
  const plusButton = screen.getByAltText(/Create New Tab/i);

  for (let tabName of tabs.slice().reverse()) {
    userEvent.click(plusButton);
    const newTabInput = await screen.findByDisplayValue(/New Tab/i);
    userEvent.clear(newTabInput);
    userEvent.type(newTabInput, tabName);
  }
}

/**
 * Creates a new tab in the control panel multitab page
 * @param tabName - the name of the tab
 */
export async function createNewTab(tabName: string) {
  const addTabButton = screen.getByAltText(/Create New Tab/i);
  userEvent.click(addTabButton);
  const tabHeaderInput = await screen.findByDisplayValue(/New Tab/);
  userEvent.clear(tabHeaderInput);
  userEvent.type(tabHeaderInput, tabName);
}

/**
 * Goes to the edit screen of the tab at the given position on the multitab page
 * @param tabPosition - the tab's position
 */
export function goToTabEditScreen(tabPosition: number) {
  const editTabButtons = screen.getAllByAltText(/edit/i);
  userEvent.click(editTabButtons[tabPosition]);
}

/**
 * Create the visualizations of given titles in the given order, when the tab edit screen is open
 * @param visualizationTitles - the titles of the visualizations
 */
export async function createVisualizations(visualizationTitles: string[]) {
  const createVisualizationButton = await screen.findByAltText(
    /Create New Visualization/i
  );

  for (let visual of visualizationTitles) {
    userEvent.click(createVisualizationButton);
    const visualHeaderInput = await screen.findByDisplayValue(
      /New Visualization/
    );
    userEvent.clear(visualHeaderInput);
    userEvent.type(visualHeaderInput, visual);
  }
}
