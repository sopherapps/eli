/**
 * Module containing tests for the pie chart visualization
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
const emptyResponseServerUrl = "ws://pie-chart-empty-response.com";
const singleDatasetServerUrl = "ws://pie-chart-single-dataset-response.com";
const multipleDatasetServerUrl = "ws://pie-chart-multiple-dataset-response.com";
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
  userEvent.selectOptions(visualizationTypeInput, ["pie-chart"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockDoughnutChart(emptyResponseServerUrl);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockDoughnutChart(emptyResponseServerUrl);
  await goToTab(tabName);
  emptyResponseServer.close();

  expect(await screen.findByText(/Disconnected/i)).toBeInTheDocument();
});

test("should show configuration errors if wrongly configured", async () => {
  const setColorButton = await screen.findByText(/^set color$/i);
  userEvent.click(setColorButton);

  await goToTab(tabName);
  const expectedErrorMessages = [
    /'Data Source URL' is not a valid websocket URL/,
    /'Sort by' should be a comma separated list of fields, with descending fields having a '-' suffix/,
    /'Lifespan of each Datapoint in seconds' should be set if 'Append new data to old data' is true/,
    /'label' is required/,
    /'color' is required/,
    /'label field' is required/,
    /'value field' is required/,
  ];

  for (let msg of expectedErrorMessages) {
    expect(screen.getByText(msg)).toBeInTheDocument();
  }
});

test("should show error if data is isMultiple", async () => {
  await setUpMockDoughnutChart(multipleDatasetServerUrl);
  await goToTab(tabName);
  expect(
    await screen.findByText(/Multiple datasets not supported here/i)
  ).toBeInTheDocument();
});

/**
 * Sets up the bar chart mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockDoughnutChart(dataSourceUrl: string) {
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

  // set the label-field
  const labelFieldInput = await screen.findByLabelText(/^label field/i);
  userEvent.clear(labelFieldInput);
  userEvent.type(labelFieldInput, "settlementPeriod");

  // set the value-field
  const valueFieldInput = await screen.findByLabelText(/^value field/i);
  userEvent.clear(valueFieldInput);
  userEvent.type(valueFieldInput, "quantity");

  // add colors
  const labelColorMaps: { label: string; color: string }[] = [
    {
      label: "34",
      color: "#fae345",
    },
    { label: "35", color: "#000645" },
    { label: "36", color: "#ffffff" },
  ];
  const setColorButton = await screen.findByText(/^set color$/i);
  for (let i = 0; i < labelColorMaps.length; i++) {
    userEvent.click(setColorButton);
  }
  const labelInputs = await screen.findAllByLabelText(/^label\*$/);
  const colorInputs = screen.getAllByLabelText(/^color\*$/);

  for (let i = 0; i < labelColorMaps.length; i++) {
    const labelColorMap = labelColorMaps[i];
    userEvent.type(labelInputs[i], labelColorMap.label);
    userEvent.type(colorInputs[i], labelColorMap.color);
  }
}
