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

test("should ask for height or show error if not provided", async () => {
  const heightInput = screen.getByLabelText(/Height \(% of screen\)/i);
  expect(heightInput).toBeInTheDocument();
  expect(heightInput).toHaveAttribute("required", "");
  expect(heightInput).toHaveAttribute("type", "range");
  expect(heightInput).toHaveAttribute("min", "0");
  expect(heightInput).toHaveAttribute("max", "100");
});

test("should ask for width or show error if not provided", async () => {});

test("should ask for orderBy fields or show error if not provided", async () => {});

test("should ask for whether to append data, defaulting to true", async () => {});

// FIXME: I will need to test that the data is actually clipped after the given lifespan
test("should ask for lifespan of data if append data is true, defaulting to 3600", async () => {});

test("should ask for label or show error if not provided", async () => {});

test("should ask for color or show error if not provided", async () => {});

test("should ask for x Axis field or show error if not provided", async () => {});

test("should ask for y Axis field or show error if not provided", async () => {});

test("should ask for chart style, defaulting to 'normal'", async () => {});

test("should ask for orientation, defaulting to 'vertical'", async () => {});
