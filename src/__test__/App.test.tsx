/**
 * Module for testing the entire app
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Home Screen", () => {
  test("App should render home screen by default", async () => {
    render(<App />);
    const ctaButton = screen.getByText(/Go to Control Panel/i);
    expect(ctaButton).toBeInTheDocument();
  });
});

describe("Control Panel", () => {
  describe("Mulitple Tabs", () => {
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

    test("every time the control panel plus icon is clicked, a new tab should be created, even in tabbar", async () => {});

    test("Upward arrow on each tab card should move the card upwards, even in tabbar", async () => {});
    test("Downward arrow on each tab card should move the card downwards, even in tabbar", async () => {});
    test("x icon on each tab card should remove the tab, even in tabbar", async () => {});
    test("edit icon on each tab card should open the single tab edit screen for tab", async () => {});
  });

  describe("Single Tab", () => {
    describe("Controls", () => {
      test("Upward arrow on each visualization card should move the card upwards, even in its tab", async () => {});
      test("Downward arrow on each visualization card should move the card downwards, even in its tab", async () => {});
      test("x icon on each visualization card should remove the visualization, even in its tab", async () => {});
    });
    describe("Visualization Types", () => {
      describe("Bar chart", () => {
        test("should ask for Source Url or show error if not provided", async () => {});

        test("should ask for height or show error if not provided", async () => {});

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
      });

      describe("MultiBar chart", () => {});

      describe("Line chart", () => {});

      describe("MultiLine chart", () => {});

      describe("Mixed chart", () => {});

      describe("Table", () => {});

      describe("Text", () => {});

      describe("Unordered List", () => {});

      describe("Ordered List", () => {});

      describe("Scatter chart", () => {});

      describe("Pie chart", () => {});

      describe("Donought chart", () => {});
    });
  });
});

describe("Tab", () => {
  describe("Layout", () => {
    test("should show all the visualizations in order", async () => {});

    test("should show all the visualizations with appropriate style width", async () => {});

    test("should show all the visualizations with appropriate style height", async () => {});
  });

  describe("Visuals", () => {
    describe("Bar chart", () => {
      test("should show 'no data' if no data is received", async () => {});

      test("should show 'disconnected' if websocket server disconnects", async () => {});

      test("should show configuration errors if wrongly configured", async () => {});

      test("should show vertical bar chart when orientation is 'vertical'", async () => {});

      test("should show horizontal bar chart when orientation is 'horizontal'", async () => {});

      test("should show error if chart style is set to 'stacked'", async () => {});

      test("should show error if data is isMultiple", async () => {});

      test("should show chart with all the expected data", async () => {});
    });

    describe("MultiBar chart", () => {});

    describe("Line chart", () => {});

    describe("MultiLine chart", () => {});

    describe("Mixed chart", () => {});

    describe("Table", () => {});

    describe("Text", () => {});

    describe("Unordered List", () => {});

    describe("Ordered List", () => {});

    describe("Scatter chart", () => {});

    describe("Pie chart", () => {});

    describe("Donought chart", () => {});
  });
});
