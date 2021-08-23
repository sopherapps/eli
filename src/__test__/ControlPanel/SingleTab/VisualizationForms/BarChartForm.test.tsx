import { render, screen, fireEvent } from "@testing-library/react";
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
  userEvent.selectOptions(visualizationTypeSelect, ["bar-chart"]);
});

test("should ask for Source Url or show error if not provided", async () => {
  const invalidUrls = ["http://google.com", "https://google.com", "random", ""];
  const validUrls = ["ws://hi", "wss://yeah"];
  const dataSourceUrlInput = screen.getByLabelText(/Data Source URL/i);
  expect(dataSourceUrlInput).toBeInTheDocument();
  // @ts-ignore
  expect(dataSourceUrlInput.required).toBe(true);
  expect(dataSourceUrlInput).toHaveAttribute("type", "url");

  for (let invalidUrl of invalidUrls) {
    userEvent.clear(dataSourceUrlInput);
    userEvent.type(dataSourceUrlInput, invalidUrl);
    // @ts-ignore
    expect(dataSourceUrlInput.checkValidity()).toBe(false);
    // @ts-ignore
    expect(dataSourceUrlInput.validationMessage).toBe(
      "Constraints not satisfied"
    );
  }

  for (let validUrl of validUrls) {
    userEvent.clear(dataSourceUrlInput);
    userEvent.type(dataSourceUrlInput, validUrl);
    // @ts-ignore
    expect(dataSourceUrlInput.checkValidity()).toBe(true);
    // @ts-ignore
    expect(dataSourceUrlInput.validationMessage).toBe("");
  }
});

test("should ask for height", async () => {
  const heightInput = screen.getByLabelText(/Height \(% of screen\)/i);
  expect(heightInput).toBeInTheDocument();
  // @ts-ignore
  expect(heightInput.required).toBe(true);
  expect(heightInput).toHaveAttribute("type", "range");
  expect(heightInput).toHaveAttribute("min", "0");
  expect(heightInput).toHaveAttribute("max", "100");
});

test("should ask for width", async () => {
  const widthInput = screen.getByLabelText(/Width \(% of screen\)/i);
  expect(widthInput).toBeInTheDocument();
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
  // @ts-ignore
  expect(sortByInput.required).toBe(true);
  expect(sortByInput).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(sortByInput);
    userEvent.type(sortByInput, invalidInput);
    // @ts-ignore
    expect(sortByInput.checkValidity()).toBe(false);
    // @ts-ignore
    expect(sortByInput.validationMessage).toBe("Constraints not satisfied");
  }

  for (let validInput of validInputs) {
    userEvent.clear(sortByInput);
    userEvent.type(sortByInput, validInput);
    // @ts-ignore
    expect(sortByInput.checkValidity()).toBe(true);
    // @ts-ignore
    expect(sortByInput.validationMessage).toBe("");
  }
});

test("should ask for whether to append data, defaulting to on", async () => {
  const labelPattern = /Append new data to old data/i;
  const appendDataInput = screen.getByLabelText(labelPattern);
  expect(appendDataInput).toBeInTheDocument();
  // @ts-ignore
  expect(appendDataInput.required).toBe(true);
  expect(appendDataInput).toHaveAttribute("type", "checkbox");
  // @ts-ignore
  expect(appendDataInput.checked).toBe(true);
  userEvent.click(appendDataInput);
  const clickedAppendDataInput = await screen.findByLabelText(labelPattern);
  // @ts-ignore
  expect(clickedAppendDataInput.checked).toBe(false);
});

// FIXME: I will need to test that the data is actually clipped after the given lifespan
test("should ask for lifespan of data only if append data is true", async () => {
  const lifeSpanLabelPattern = /Lifespan of each Datapoint in seconds/i;
  const lifeSpanInput = screen.getByLabelText(lifeSpanLabelPattern);
  expect(lifeSpanInput).toBeInTheDocument();
  // @ts-ignore
  expect(lifeSpanInput.required).toBe(true);
  expect(lifeSpanInput).toHaveAttribute("type", "number");
  expect(lifeSpanInput).toHaveAttribute("min", "1");

  const appendDataLabelPattern = /Append new data to old data/i;
  const appendDataInput = screen.getByLabelText(appendDataLabelPattern);
  userEvent.click(appendDataInput);
  const clickedAppendDataInput = await screen.findByLabelText(
    appendDataLabelPattern
  );
  // @ts-ignore
  expect(clickedAppendDataInput.checked).toBe(false);
  expect(screen.queryByLabelText(lifeSpanLabelPattern)).toBeNull();
});

test("should ask for label or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const labelInput = screen.getByLabelText(/label/i);
  expect(labelInput).toBeInTheDocument();
  // @ts-ignore
  expect(labelInput.required).toBe(true);
  expect(labelInput).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(labelInput);
    userEvent.type(labelInput, invalidInput);
    // @ts-ignore
    expect(labelInput.checkValidity()).toBe(false);
    // @ts-ignore
    expect(labelInput.validationMessage).toBe("Constraints not satisfied");
  }

  for (let validInput of validInputs) {
    userEvent.clear(labelInput);
    userEvent.type(labelInput, validInput);
    // @ts-ignore
    expect(labelInput.checkValidity()).toBe(true);
    // @ts-ignore
    expect(labelInput.validationMessage).toBe("");
  }
});

test("should ask for color or show error if not provided", async () => {
  const colorsViaText = ["#674646", "#ffffff", "#000000"];
  const colorViaColorInput = ["#cdf675", "#cccccc", "#555555"];
  const colorTextInput = screen.getByLabelText(/color/i);
  expect(colorTextInput).toBeInTheDocument();
  // @ts-ignore
  expect(colorTextInput.required).toBe(true);
  expect(colorTextInput).toHaveAttribute("type", "text");

  const colorInput = colorTextInput.nextSibling;
  // @ts-ignore
  expect(colorInput.required).toBe(true);
  expect(colorInput).toHaveAttribute("type", "color");

  for (let color of colorsViaText) {
    userEvent.clear(colorTextInput);
    userEvent.type(colorTextInput, color);
    const changedColorTextInput = await screen.findByLabelText(/color/i);
    // @ts-ignore
    expect(changedColorTextInput.value).toBe(color);
    // @ts-ignore
    expect(changedColorTextInput.nextSibling.value).toBe(color);
  }

  for (let color of colorViaColorInput) {
    fireEvent.change(colorTextInput, { target: { value: color } });
    const changedColorTextInput = await screen.findByLabelText(/color/i);
    // @ts-ignore
    expect(changedColorTextInput.value).toBe(color);
    // @ts-ignore
    expect(changedColorTextInput.nextSibling.value).toBe(color);
  }
});

test("should ask for x Axis field or show error if not provided", async () => {});

test("should ask for y Axis field or show error if not provided", async () => {});

test("should ask for chart style, defaulting to 'normal'", async () => {});

test("should ask for orientation, defaulting to 'vertical'", async () => {});
