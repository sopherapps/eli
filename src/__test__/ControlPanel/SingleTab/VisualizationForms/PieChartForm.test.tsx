/**
 * Module to test the piechart form
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../../App";
import {
  goToControlPanel,
  createNewTab,
  goToTabEditScreen,
  createVisualizations,
} from "../../../../utils/test-utils";

beforeEach(async () => {
  const visualName = "first";
  render(<App />);
  await goToControlPanel();
  await createNewTab("first tab");
  goToTabEditScreen(0);
  await createVisualizations([visualName]);
  const visualizationTypeSelect = screen.getByLabelText(/Visualization Type/i);
  userEvent.selectOptions(visualizationTypeSelect, ["pie-chart"]);
});

test("should ask for Source Url or show error if not provided", async () => {
  const invalidUrls = ["http://google.com", "https://google.com", "random", ""];
  const validUrls = ["ws://hi", "wss://yeah"];
  const dataSourceUrlInput = screen.getByLabelText(/Data Source URL/i);
  expect(dataSourceUrlInput).toBeInTheDocument();
  expect(dataSourceUrlInput).toBeRequired();
  expect(dataSourceUrlInput).toHaveAttribute("type", "url");

  for (let invalidUrl of invalidUrls) {
    userEvent.clear(dataSourceUrlInput);
    userEvent.type(dataSourceUrlInput, invalidUrl);
    expect(dataSourceUrlInput).toBeInvalid();
  }

  for (let validUrl of validUrls) {
    userEvent.clear(dataSourceUrlInput);
    userEvent.type(dataSourceUrlInput, validUrl);
    expect(dataSourceUrlInput).toBeValid();
  }
});

test("should ask for height", async () => {
  const heightInput = screen.getByLabelText(/Height \(% of screen\)/i);
  expect(heightInput).toBeInTheDocument();
  // toBeRequired does not seem to work well with range inputs
  // @ts-ignore
  expect(heightInput.required).toBe(true);
  expect(heightInput).toHaveAttribute("type", "range");
  expect(heightInput).toHaveAttribute("min", "0");
  expect(heightInput).toHaveAttribute("max", "100");
});

test("should ask for width", async () => {
  const widthInput = screen.getByLabelText(/Width \(% of screen\)/i);
  expect(widthInput).toBeInTheDocument();
  // toBeRequired does not seem to work well with range inputs
  // @ts-ignore
  expect(widthInput.required).toBe(true);
  expect(widthInput).toHaveAttribute("type", "range");
  expect(widthInput).toHaveAttribute("min", "0");
  expect(widthInput).toHaveAttribute("max", "100");
});

test("should ask for sortBy fields or show error if not provided", async () => {
  const invalidInputs = [",,", "", "foo,"];
  const validInputs = ["foo", "foo,-bar,care for you,hallelujah,-woo-hoo good"];
  const sortByInput = screen.getByLabelText(/Sort by/i);
  expect(sortByInput).toBeInTheDocument();
  expect(sortByInput).toBeRequired();
  expect(sortByInput).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(sortByInput);
    userEvent.type(sortByInput, invalidInput);
    expect(sortByInput).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(sortByInput);
    userEvent.type(sortByInput, validInput);
    expect(sortByInput).toBeValid();
  }
});

test("should ask for whether to append data, defaulting to on", async () => {
  const labelPattern = /Append new data to old data/i;
  const appendDataInput = screen.getByLabelText(labelPattern);
  expect(appendDataInput).toBeInTheDocument();

  expect(appendDataInput).toBeRequired();
  expect(appendDataInput).toHaveAttribute("type", "checkbox");
  expect(appendDataInput).toBeChecked();

  userEvent.click(appendDataInput);
  const clickedAppendDataInput = await screen.findByLabelText(labelPattern);

  expect(clickedAppendDataInput).not.toBeChecked();
});

// FIXME: I will need to test that the data is actually clipped after the given lifespan
test("should ask for lifespan of data only if append data is true", async () => {
  const lifeSpanLabelPattern = /Lifespan of each Datapoint in seconds/i;
  const appendDataLabelPattern = /Append new data to old data/i;
  const lifeSpanInput = screen.getByLabelText(lifeSpanLabelPattern);

  expect(lifeSpanInput).toBeInTheDocument();
  expect(lifeSpanInput).toBeRequired();
  expect(lifeSpanInput).toHaveAttribute("type", "number");
  expect(lifeSpanInput).toHaveAttribute("min", "1");

  const appendDataInput = screen.getByLabelText(appendDataLabelPattern);
  userEvent.click(appendDataInput);
  const clickedAppendDataInput = await screen.findByLabelText(
    appendDataLabelPattern
  );

  expect(clickedAppendDataInput).not.toBeChecked();
  expect(screen.queryByLabelText(lifeSpanLabelPattern)).toBeNull();
});

test("should ask for label field or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const labelInput = screen.getByLabelText(/label/i);

  expect(labelInput).toBeInTheDocument();
  expect(labelInput).toBeRequired();
  expect(labelInput).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(labelInput);
    userEvent.type(labelInput, invalidInput);
    expect(labelInput).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(labelInput);
    userEvent.type(labelInput, validInput);
    expect(labelInput).toBeValid();
  }
});

test("should ask for value field or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const valueInput = screen.getByLabelText(/value/i);

  expect(valueInput).toBeInTheDocument();
  expect(valueInput).toBeRequired();
  expect(valueInput).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(valueInput);
    userEvent.type(valueInput, invalidInput);
    expect(valueInput).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(valueInput);
    userEvent.type(valueInput, validInput);
    expect(valueInput).toBeValid();
  }
});
