/**
 * Moduel for testing the display of the home page
 */
import { render, screen } from "@testing-library/react";
import App from "../App";
import { tabOrderKey, tabsKey } from "../config";
import { addMockTabs } from "../utils/prefill-storage";

test("App should render home screen by default", async () => {
  render(<App />);
  const ctaButton = screen.getByText(/Go to Control Panel/i);
  expect(ctaButton).toBeInTheDocument();
});

test("App should redirect to first tab if there are tabs", async () => {
  addMockTabs();
  render(<App />);
  expect(await screen.findByText(/Visualizations/i)).toBeInTheDocument();
  expect(screen.queryByText(/Go to Control Panel/i)).toBeNull();
});
