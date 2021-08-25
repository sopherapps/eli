import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Server } from "mock-socket";
import { resolve } from "path";
import App from "../../../App";
import createWebSocketMockServer from "../../../utils/mock-ws-server";
import {
  goToControlPanel,
  createNewTab,
  goToTabEditScreen,
  createVisualizations,
  goToTab,
} from "../../../utils/test-utils";

let emptyResponseServer: Server;
const tabName = "the tab";
const visual = "the visualization";
const emptyResponseServerUrl = "ws://empty-response.com";

const emptyResponseJsonPath = resolve("src/assets/json/empty-response.json");

beforeEach(async () => {
  emptyResponseServer = createWebSocketMockServer(
    emptyResponseServerUrl,
    100,
    emptyResponseJsonPath
  );

  render(<App />);
  await goToControlPanel();
  await createNewTab(tabName);
  goToTabEditScreen(0);
  await createVisualizations([visual]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockBarChart(emptyResponseServerUrl);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

// test("should show 'disconnected' if websocket server disconnects", async () => {});

// test("should show configuration errors if wrongly configured", async () => {});

// test("should show vertical bar chart when orientation is 'vertical'", async () => {});

// test("should show horizontal bar chart when orientation is 'horizontal'", async () => {});

// test("should show error if chart style is set to 'stacked'", async () => {});

// test("should show error if data is isMultiple", async () => {});

// test("should show chart with all the expected data", async () => {});

/**
 * Sets up the bar chart mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockBarChart(dataSourceUrl: string) {
  // set the data source URL
  const dataSourceUrlInput = screen.getByLabelText(/Data Source URL/i);
  userEvent.clear(dataSourceUrlInput);
  userEvent.type(dataSourceUrlInput, dataSourceUrl);

  // set sortby
  const sortByInput = await screen.findByLabelText(/Sort by/i);
  userEvent.clear(sortByInput);
  userEvent.type(sortByInput, "settlementDate,settlementPeriod");

  // set lifespan
  const lifeSpanInput = await screen.findByLabelText(/^Lifespan/i);
  userEvent.clear(lifeSpanInput);
  userEvent.type(lifeSpanInput, "7200");

  // set the visualization type
  const visualizationTypeInput = await screen.findByLabelText(
    /Visualization Type/i
  );
  userEvent.selectOptions(visualizationTypeInput, ["bar-chart"]);

  // set the label
  const labelInput = await screen.findByLabelText(/^label/i);
  userEvent.clear(labelInput);
  userEvent.type(labelInput, "Empty Response");

  // set the color
  const colorTextInput = await screen.findByLabelText(/^color/i);
  userEvent.clear(colorTextInput);
  userEvent.type(colorTextInput, "#ffffff");

  // set the x-axis-field
  const xAxisFIeldInput = await screen.findByLabelText(/^x-axis field/i);
  userEvent.clear(xAxisFIeldInput);
  userEvent.type(xAxisFIeldInput, "settlementPeriod");

  // set the y-axis-field
  const yAxisInput = await screen.findByLabelText(/^y-axis field/i);
  userEvent.clear(yAxisInput);
  userEvent.type(yAxisInput, "quantity");
}
