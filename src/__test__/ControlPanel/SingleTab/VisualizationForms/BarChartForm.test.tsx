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
  userEvent.selectOptions(visualizationTypeSelect, ["bar-chart"]);
});

test("should ask for Source Url or show error if not provided", async () => {
  const invalidUrls = ["http://google.com", "https://google.com", "random", ""];
  const validUrls = ["ws://hi", "wss://yeah"];
  const dataSourceUrlInput = screen.getByLabelText(/Data Source URL/i);
  expect(dataSourceUrlInput).toBeInTheDocument();
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
  expect(heightInput).toHaveAttribute("required", "");
  expect(heightInput).toHaveAttribute("type", "range");
  expect(heightInput).toHaveAttribute("min", "0");
  expect(heightInput).toHaveAttribute("max", "100");
});

test("should ask for width", async () => {
  const widthInput = screen.getByLabelText(/Width \(% of screen\)/i);
  expect(widthInput).toBeInTheDocument();
  expect(widthInput).toHaveAttribute("required", "");
  expect(widthInput).toHaveAttribute("type", "range");
  expect(widthInput).toHaveAttribute("min", "0");
  expect(widthInput).toHaveAttribute("max", "100");
});

test("should ask for sortBy fields or show error if not provided", async () => {
  const invalidInputs = [",,", "", "foo,"];
  const validInputs = ["foo", "foo,-bar,care for you,hallelujah,-woo-hoo good"];
  const sortByInput = screen.getByLabelText(/Sort by/i);
  expect(sortByInput).toBeInTheDocument();
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

test("should ask for whether to append data, defaulting to true", async () => {});

// FIXME: I will need to test that the data is actually clipped after the given lifespan
test("should ask for lifespan of data if append data is true, defaulting to 3600", async () => {});

test("should ask for label or show error if not provided", async () => {});

test("should ask for color or show error if not provided", async () => {});

test("should ask for x Axis field or show error if not provided", async () => {});

test("should ask for y Axis field or show error if not provided", async () => {});

test("should ask for chart style, defaulting to 'normal'", async () => {});

test("should ask for orientation, defaulting to 'vertical'", async () => {});
