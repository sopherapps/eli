import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import {
  goToControlPanel,
  createNewTab,
  goToTabEditScreen,
  createVisualizations,
  getAllCreatedVisualsTopToBottom,
} from "../../utils/test-utils";

/**
 * Module to test the Layout of the Tab page
 */
test("should show all the visualizations in order", async () => {
  const tabName = "the tab";
  const visuals = ["first", "second", "third", "fourth"];
  render(<App />);
  await goToControlPanel();
  await createNewTab(tabName);
  goToTabEditScreen(0);
  await createVisualizations(visuals);

  const tabMenuItem = screen.getByText(tabName);
  userEvent.click(tabMenuItem);

  await screen.findByText(/^Visualizations$/i);
  const visualizationHeadings = screen
    .getAllByTestId("visualization-heading")
    .map((elem) => elem.innerHTML);
  expect(visualizationHeadings).toEqual(visuals);
});

test("should show all the visualizations with appropriate style width", async () => {
  const tabName = "the tab";
  const validVisualWidthMap: { [key: string]: number } = {
    first: 12,
    second: 90,
    third: -45,
    fourth: 120,
  };

  render(<App />);
  await goToControlPanel();
  await createNewTab(tabName);
  goToTabEditScreen(0);
  await createVisualizations(Object.keys(validVisualWidthMap));

  const createdVisuals = await getAllCreatedVisualsTopToBottom();
  const widthInputs = screen.getAllByLabelText(/^Width \(% of screen\)/i);
  const expectedWidths: string[] = [];

  for (let i = 0; i < createdVisuals.length; i++) {
    // @ts-ignore
    const visual: string = createdVisuals[i];
    const value = validVisualWidthMap[visual];
    fireEvent.change(widthInputs[i], { target: { value } });
    expectedWidths.push(`${Math.min(Math.max(0, value), 100)}%`);
  }

  const tabMenuItem = screen.getByText(tabName);
  userEvent.click(tabMenuItem);

  await screen.findByText(/^Visualizations$/i);
  const visualWidths = screen
    .getAllByTestId("visualization-ui-card")
    .map((elem) => elem.style.width);
  expect(visualWidths).toEqual(expectedWidths);
});

test("should show all the visualizations with appropriate style height", async () => {
  const tabName = "the tab";
  const validVisualHeightMap: { [key: string]: number } = {
    first: 12,
    second: 90,
    third: -45,
    fourth: 120,
  };

  render(<App />);
  await goToControlPanel();
  await createNewTab(tabName);
  goToTabEditScreen(0);
  await createVisualizations(Object.keys(validVisualHeightMap));

  const createdVisuals = await getAllCreatedVisualsTopToBottom();
  const heightInputs = screen.getAllByLabelText(/^Height \(% of screen\)/i);
  const expectedHeights: string[] = [];

  for (let i = 0; i < createdVisuals.length; i++) {
    // @ts-ignore
    const visual: string = createdVisuals[i];
    const value = validVisualHeightMap[visual];
    fireEvent.change(heightInputs[i], { target: { value } });
    expectedHeights.push(`${Math.min(Math.max(0, value), 100)}vh`);
  }

  const tabMenuItem = screen.getByText(tabName);
  userEvent.click(tabMenuItem);

  await screen.findByText(/^Visualizations$/i);
  const visualHeights = screen
    .getAllByTestId("visualization-ui-card")
    .map((elem) => elem.style.height);
  expect(visualHeights).toEqual(expectedHeights);
});
