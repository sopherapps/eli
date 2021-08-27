/**
 * Module containing tests for the BAR Chart visualization
 */
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
let singleDatasetServer: Server;
let multipleDatasetServer: Server;

const tabName = "the tab";
const visual = "the visualization";
const emptyResponseServerUrl = "ws://bar-chart-empty-response.com";
const singleDatasetServerUrl = "ws://bar-chart-single-dataset-response.com";
const multipleDatasetServerUrl = "ws://bar-chart-multiple-dataset-response.com";
const emptyResponseJsonPath = resolve("src/assets/json/empty-response.json");
const singleDatasetResponseJsonPath = resolve(
  "src/assets/json/single-dataset-response.json"
);
const multipleDatasetResponseJsonPath = resolve(
  "src/assets/json/multiple-dataset-response.json"
);

beforeEach(async () => {
  emptyResponseServer = createWebSocketMockServer(
    emptyResponseServerUrl,
    100,
    emptyResponseJsonPath
  );
  singleDatasetServer = createWebSocketMockServer(
    singleDatasetServerUrl,
    100,
    singleDatasetResponseJsonPath
  );
  multipleDatasetServer = createWebSocketMockServer(
    multipleDatasetServerUrl,
    100,
    multipleDatasetResponseJsonPath
  );
  render(<App />);
  await goToControlPanel();
  await createNewTab(tabName);
  goToTabEditScreen(0);
  await createVisualizations([visual]);

  const visualizationTypeInput = await screen.findByLabelText(
    /Visualization Type/i
  );
  userEvent.selectOptions(visualizationTypeInput, ["bar-chart"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockBarChart(emptyResponseServerUrl);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockBarChart(emptyResponseServerUrl);
  await goToTab(tabName);
  emptyResponseServer.close();

  expect(await screen.findByText(/Disconnected/i)).toBeInTheDocument();
});

test("should show configuration errors if wrongly configured", async () => {
  await goToTab(tabName);
  const expectedErrorMessages = [
    /'Data Source URL' is not a valid websocket URL/,
    /'Sort by' should be a comma separated list of fields, with descending fields having a '-' suffix/,
    /'Lifespan of each Datapoint in seconds' should be set if 'Append new data to old data' is true/,
    /'label' is required/,
    /'color' is required/,
    /'x-axis field' is required/,
    /'y-axis field' is required/,
  ];

  for (let msg of expectedErrorMessages) {
    expect(screen.getByText(msg)).toBeInTheDocument();
  }
});

test("should show error if data is isMultiple", async () => {
  await setUpMockBarChart(multipleDatasetServerUrl);
  await goToTab(tabName);
  expect(
    await screen.findByText(/Multiple datasets not supported here/i)
  ).toBeInTheDocument();
});

test("should show error if chart style is set to 'stacked'", async () => {
  await setUpMockBarChart(singleDatasetServerUrl);

  const chartStyleSelect = await screen.findByLabelText(/chart style/i);
  userEvent.selectOptions(chartStyleSelect, ["stacked"]);

  await goToTab(tabName);

  expect(
    await screen.findByText(
      /Stacked Charts are only available in the multiple bar chart/i
    )
  ).toBeInTheDocument();
});

/**
 * Sets up the bar chart mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockBarChart(dataSourceUrl: string) {
  // set the data source URL
  const dataSourceUrlInput = await screen.findByLabelText(/Data Source URL/i);
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

  // set the label
  const labelInput = await screen.findByLabelText(/^label/i);
  userEvent.clear(labelInput);
  userEvent.type(labelInput, "Empty Response");

  // set the color
  const colorTextInput = await screen.findByLabelText(/^color/i);
  userEvent.clear(colorTextInput);
  userEvent.type(colorTextInput, "#ffffff");

  // set the x-axis-field
  const xAxisFieldInput = await screen.findByLabelText(/^x-axis field/i);
  userEvent.clear(xAxisFieldInput);
  userEvent.type(xAxisFieldInput, "settlementPeriod");

  // set the y-axis-field
  const yAxisFieldInput = await screen.findByLabelText(/^y-axis field/i);
  userEvent.clear(yAxisFieldInput);
  userEvent.type(yAxisFieldInput, "quantity");
}
