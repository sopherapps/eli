import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import {
  shiftValueBackward,
  shiftValueForward,
} from "../../../utils/array-utils";
import {
  createNewTab,
  createVisualizations,
  goToControlPanel,
  goToTabEditScreen,
} from "../../../utils/test-utils";

test("Upward arrow on each visualization card should move the card upwards", async () => {
  const visuals = [
    "population scatter",
    "population table",
    "population chart",
    "population pie",
  ];
  render(<App />);
  await goToControlPanel();
  await createNewTab("first tab");
  goToTabEditScreen(0);
  await createVisualizations(visuals);

  // assert that the created visuals are the same order as the given list
  expect(await getAllCreatedVisualsTopToBottom()).toEqual(
    expect.arrayContaining(visuals)
  );

  const upwardArrows = screen.getAllByAltText(/move up/);
  const visualPositionToShift = 2;
  // The first visualization has no upward arrow
  const upwardArrowOfInterest = upwardArrows[visualPositionToShift - 1];

  for (let steps = 1; steps <= visualPositionToShift; steps++) {
    userEvent.click(upwardArrowOfInterest);
    expect(await getAllCreatedVisualsTopToBottom()).toEqual(
      shiftValueForward(visuals, visualPositionToShift, steps)
    );
  }
});

test("Downward arrow on each visualization card should move the card downwards", async () => {
  const visuals = [
    "population scatter",
    "population table",
    "population chart",
    "population pie",
  ];
  render(<App />);
  await goToControlPanel();
  await createNewTab("first tab");
  goToTabEditScreen(0);
  await createVisualizations(visuals);

  // assert that the created visuals are the same order as the given list
  expect(await getAllCreatedVisualsTopToBottom()).toEqual(
    expect.arrayContaining(visuals)
  );

  const downwardArrows = screen.getAllByAltText(/move down/);
  const visualPositionToShift = 1;
  const downwardArrowOfInterest = downwardArrows[visualPositionToShift];

  for (let steps = 1; steps < visuals.length - visualPositionToShift; steps++) {
    userEvent.click(downwardArrowOfInterest);
    expect(await getAllCreatedVisualsTopToBottom()).toEqual(
      shiftValueBackward(visuals, visualPositionToShift, steps)
    );
  }
});
test("x icon on each visualization card should remove the visualization", async () => {
  const visuals = [
    "population scatter",
    "population table",
    "population chart",
    "population pie",
  ];
  render(<App />);
  await goToControlPanel();
  await createNewTab("first tab");
  goToTabEditScreen(0);
  await createVisualizations(visuals);

  const closeButtons = screen.getAllByAltText(/^close$/i);

  for (let index = 0; index < visuals.length; index++) {
    userEvent.click(closeButtons[index]);
    expect(screen.queryByDisplayValue(visuals[index])).toBeNull();
  }
});

test("should return you to the control panel when the back arrow button is clicked", async () => {
  render(<App />);
  await goToControlPanel();
  await createNewTab("first tab");
  goToTabEditScreen(0);

  const backButton = await screen.findByAltText(/^back to control panel$/i);
  userEvent.click(backButton);

  expect(await screen.findByText(/TABS/i)).toBeInTheDocument();
});

/**
 * Gets the titles of the created visualizations in order top to bottom on the single tab screen
 * @returns {Promise<string[]>}
 */
async function getAllCreatedVisualsTopToBottom(): Promise<string[]> {
  const createdVisuals = await screen.findAllByTestId("title");
  // @ts-ignore
  return createdVisuals.map((input) => input.value);
}
