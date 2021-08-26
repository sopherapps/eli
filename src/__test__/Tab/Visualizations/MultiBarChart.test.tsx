/**
 * Module containing tests for the multiple bar Chart visualization
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
  userEvent.selectOptions(visualizationTypeInput, ["multiple-bar-chart"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockMultiBarChart(emptyResponseServerUrl);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockMultiBarChart(emptyResponseServerUrl);
  await goToTab(tabName);
  emptyResponseServer.close();

  expect(await screen.findByText(/Disconnected/i)).toBeInTheDocument();
});

test("should show configuration errors if wrongly configured", async () => {
  const addDatasetButton = await screen.findByText(/^add dataset$/i);
  userEvent.click(addDatasetButton);

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

test("should show error if data is not isMultiple", async () => {
  await setUpMockMultiBarChart(singleDatasetServerUrl);
  await goToTab(tabName);
  expect(
    await screen.findByText(/Only multiple datasets supported here/i)
  ).toBeInTheDocument();
});

/**
 * Sets up the bar chart mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockMultiBarChart(dataSourceUrl: string) {
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

  // add datasets
  const configs: { name: string; label: string; color: string }[] = [
    {
      name: '"Fossil Gas"',
      label: "fossil gas",
      color: "#fae345",
    },
    { name: '"Biomass"', label: "biomass", color: "#000645" },
    { name: '"Fossil Oil"', label: "fossil oil", color: "#ffffff" },
  ];
  const addDatasetButton = await screen.findByText(/^add dataset$/i);
  for (let i = 0; i < configs.length; i++) {
    userEvent.click(addDatasetButton);
  }
  const nameInputs = await screen.findAllByLabelText(/^name\*$/);
  const labelInputs = await screen.findAllByLabelText(/^label\*$/);
  const colorInputs = screen.getAllByLabelText(/^color\*$/);
  const xAxisFieldInputs = screen.getAllByLabelText(/^x-axis field/i);
  const yAxisFieldInputs = screen.getAllByLabelText(/^y-axis field/i);

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    userEvent.clear(nameInputs[i]);
    userEvent.type(nameInputs[i], config.name);

    userEvent.clear(labelInputs[i]);
    userEvent.type(labelInputs[i], config.label);

    userEvent.clear(colorInputs[i]);
    userEvent.type(colorInputs[i], config.color);

    userEvent.clear(xAxisFieldInputs[i]);
    userEvent.type(xAxisFieldInputs[i], "settlementPeriod");

    userEvent.clear(yAxisFieldInputs[i]);
    userEvent.type(yAxisFieldInputs[i], "quantity");
  }
}
