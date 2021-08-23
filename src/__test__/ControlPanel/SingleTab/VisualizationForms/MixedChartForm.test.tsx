/**
 * Module for teting the mixed chart form
 */
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
  userEvent.selectOptions(visualizationTypeSelect, ["mixed-chart"]);
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

test("should ask for bar chart style, defaulting to 'normal'", async () => {
  const labelPattern = /bar chart style/i;
  const newValue = "stacked";
  const chartStyleInput = screen.getByLabelText(labelPattern);
  expect(chartStyleInput).toBeInTheDocument();
  expect(chartStyleInput).not.toBeRequired();
  expect(chartStyleInput).toHaveDisplayValue("normal");

  userEvent.selectOptions(chartStyleInput, [newValue]);
  const changedChartStyleInput = await screen.findByLabelText(labelPattern);

  expect(changedChartStyleInput).toHaveDisplayValue(newValue);
});

test("should ask for orientation, defaulting to 'vertical'", async () => {
  const labelPattern = /orientation/i;
  const newValue = "horizontal";
  const input = screen.getByLabelText(labelPattern);
  expect(input).toBeInTheDocument();
  expect(input).not.toBeRequired();
  expect(input).toHaveDisplayValue("vertical");

  userEvent.selectOptions(input, [newValue]);
  const changedinput = await screen.findByLabelText(labelPattern);

  expect(changedinput).toHaveDisplayValue(newValue);
});

test("should add new set of config inputs when 'add bar dataset' button is clicked", async () => {
  const buttonPattern = /add bar dataset/i;
  const addDatasetButton = screen.getByText(buttonPattern);
  const configLabels = [
    /^name \[bar dataset\]\*$/i,
    /^label \[bar dataset\]\*$/i,
    /^color \[bar dataset\]\*$/i,
    /^x-axis field \[bar dataset\]\*$/i,
    /^y-axis field \[bar dataset\]\*$/i,
  ];
  expect(addDatasetButton).toBeInTheDocument();

  for (let times = 0; times < 4; times++) {
    for (let configLabel of configLabels) {
      const inputs = screen.queryAllByLabelText(configLabel);
      expect(inputs.length).toEqual(times);
    }
    userEvent.click(addDatasetButton);
  }
});

test("should ask for name of bar dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add bar dataset/i);
  userEvent.click(addDatasetButton);

  const input = screen.getByLabelText(/name \[bar dataset\]/i);

  expect(input).toBeInTheDocument();
  expect(input).toBeRequired();
  expect(input).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(input);
    userEvent.type(input, invalidInput);
    expect(input).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(input);
    userEvent.type(input, validInput);
    expect(input).toBeValid();
  }
});

test("should ask for label for bar dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add bar dataset/i);
  userEvent.click(addDatasetButton);

  const labelInput = screen.getByLabelText(/label \[bar dataset\]/i);

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

test("should ask for color for bar dataset or show error if not provided", async () => {
  const colorsViaText = ["#674646", "#ffffff", "#000000"];
  const colorViaColorInput = ["#cdf675", "#cccccc", "#555555"];
  const addDatasetButton = screen.getByText(/add bar dataset/i);
  userEvent.click(addDatasetButton);

  const colorTextInput = screen.getByLabelText(/color \[bar dataset\]/i);
  expect(colorTextInput).toBeInTheDocument();
  expect(colorTextInput).toBeRequired();
  expect(colorTextInput).toHaveAttribute("type", "text");

  const colorInput = colorTextInput.nextSibling;
  // toBeRequired does not seem to work well with color inputs
  // @ts-ignore
  expect(colorInput.required).toBe(true);
  expect(colorInput).toHaveAttribute("type", "color");

  for (let color of colorsViaText) {
    userEvent.clear(colorTextInput);
    userEvent.type(colorTextInput, color);
    const changedColorTextInput = await screen.findByLabelText(/color/i);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }

  for (let color of colorViaColorInput) {
    fireEvent.change(colorTextInput, { target: { value: color } });
    const changedColorTextInput = await screen.findByLabelText(/color/i);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }
});

test("should ask for x Axis field for bar dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add bar dataset/i);
  userEvent.click(addDatasetButton);

  const inputElement = screen.getByLabelText(/x-axis field \[bar dataset\]/i);
  expect(inputElement).toBeInTheDocument();

  expect(inputElement).toBeRequired();
  expect(inputElement).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, invalidInput);
    expect(inputElement).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, validInput);
    expect(inputElement).toBeValid();
  }
});

test("should ask for y Axis field for bar dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add bar dataset/i);
  userEvent.click(addDatasetButton);

  const inputElement = screen.getByLabelText(/y-axis field \[bar dataset\]/i);

  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeRequired();
  expect(inputElement).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, invalidInput);
    expect(inputElement).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, validInput);
    expect(inputElement).toBeValid();
  }
});

test("should add new set of config inputs when 'add line dataset' button is clicked", async () => {
  const buttonPattern = /add line dataset/i;
  const addDatasetButton = screen.getByText(buttonPattern);
  const configLabels = [
    /^name \[line dataset\]\*$/i,
    /^label \[line dataset\]\*$/i,
    /^color \[line dataset\]\*$/i,
    /^x-axis field \[line dataset\]\*$/i,
    /^y-axis field \[line dataset\]\*$/i,
    /^chart style \[line dataset\]$/i,
    /^color of area under line \[line dataset\]$/i,
  ];
  expect(addDatasetButton).toBeInTheDocument();

  for (let times = 0; times < 4; times++) {
    for (let configLabel of configLabels) {
      const inputs = screen.queryAllByLabelText(configLabel);
      expect(inputs.length).toEqual(times);
    }
    userEvent.click(addDatasetButton);
  }
});

test("should ask for name of line dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const input = screen.getByLabelText(/name \[line dataset\]/i);

  expect(input).toBeInTheDocument();
  expect(input).toBeRequired();
  expect(input).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(input);
    userEvent.type(input, invalidInput);
    expect(input).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(input);
    userEvent.type(input, validInput);
    expect(input).toBeValid();
  }
});

test("should ask for label field for line dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const labelInput = screen.getByLabelText(/label \[line dataset\]/i);

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

test("should ask for color for line dataset or show error if not provided", async () => {
  const labelPattern = /^color \[line dataset\]\*$/i;
  const colorsViaText = ["#674646", "#ffffff", "#000000"];
  const colorViaColorInput = ["#cdf675", "#cccccc", "#555555"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const colorTextInput = screen.getByLabelText(labelPattern);
  expect(colorTextInput).toBeInTheDocument();
  expect(colorTextInput).toBeRequired();
  expect(colorTextInput).toHaveAttribute("type", "text");

  const colorInput = colorTextInput.nextSibling;
  // toBeRequired does not seem to work well with color inputs
  // @ts-ignore
  expect(colorInput.required).toBe(true);
  expect(colorInput).toHaveAttribute("type", "color");

  for (let color of colorsViaText) {
    userEvent.clear(colorTextInput);
    userEvent.type(colorTextInput, color);
    const changedColorTextInput = await screen.findByLabelText(labelPattern);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }

  for (let color of colorViaColorInput) {
    fireEvent.change(colorTextInput, { target: { value: color } });
    const changedColorTextInput = await screen.findByLabelText(labelPattern);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }
});

test("should ask for x Axis field for line dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const inputElement = screen.getByLabelText(/x-axis field \[line dataset\]/i);
  expect(inputElement).toBeInTheDocument();

  expect(inputElement).toBeRequired();
  expect(inputElement).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, invalidInput);
    expect(inputElement).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, validInput);
    expect(inputElement).toBeValid();
  }
});

test("should ask for y Axis field for line dataset or show error if not provided", async () => {
  const invalidInputs = [""];
  const validInputs = ["foo bar-yeah_8"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const inputElement = screen.getByLabelText(/y-axis field \[line dataset\]/i);

  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeRequired();
  expect(inputElement).toHaveAttribute("type", "text");

  for (let invalidInput of invalidInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, invalidInput);
    expect(inputElement).toBeInvalid();
  }

  for (let validInput of validInputs) {
    userEvent.clear(inputElement);
    userEvent.type(inputElement, validInput);
    expect(inputElement).toBeValid();
  }
});

test("should ask for chart style for line dataset, defaulting to 'normal'", async () => {
  const labelPattern = /chart style \[line dataset\]/i;
  const newValue = "dotted";
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const chartStyleInput = screen.getByLabelText(labelPattern);
  expect(chartStyleInput).toBeInTheDocument();
  expect(chartStyleInput).not.toBeRequired();
  expect(chartStyleInput).toHaveDisplayValue("normal");

  userEvent.selectOptions(chartStyleInput, [newValue]);
  const changedChartStyleInput = await screen.findByLabelText(labelPattern);

  expect(changedChartStyleInput).toHaveDisplayValue(newValue);
});

test("should ask for color of area under the line", async () => {
  const labelPattern = /color of area under line \[line dataset\]/i;
  const colorsViaText = ["#674646", "#ffffff", "#000000"];
  const colorViaColorInput = ["#cdf675", "#cccccc", "#555555"];
  const addDatasetButton = screen.getByText(/add line dataset/i);
  userEvent.click(addDatasetButton);

  const colorTextInput = screen.getByLabelText(labelPattern);
  expect(colorTextInput).toBeInTheDocument();
  expect(colorTextInput).not.toBeRequired();
  expect(colorTextInput).toHaveAttribute("type", "text");

  const colorInput = colorTextInput.nextSibling;
  // toBeRequired does not seem to work well with color inputs
  // @ts-ignore
  expect(colorInput.required).toBe(false);
  expect(colorInput).toHaveAttribute("type", "color");

  for (let color of colorsViaText) {
    userEvent.clear(colorTextInput);
    userEvent.type(colorTextInput, color);
    const changedColorTextInput = await screen.findByLabelText(labelPattern);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }

  for (let color of colorViaColorInput) {
    fireEvent.change(colorTextInput, { target: { value: color } });
    const changedColorTextInput = await screen.findByLabelText(labelPattern);
    expect(changedColorTextInput).toHaveDisplayValue(color);
    expect(changedColorTextInput?.nextSibling).toHaveDisplayValue(color);
  }
});
