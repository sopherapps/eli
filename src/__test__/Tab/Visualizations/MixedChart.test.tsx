/**
 * Module containing tests for the mixed Chart visualization
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
const emptyResponseServerUrl = "ws://mixed-chart-empty-response.com";
const singleDatasetServerUrl = "ws://mixed-chart-single-dataset-response.com";
const multipleDatasetServerUrl =
  "ws://mixed-chart-multiple-dataset-response.com";
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
  userEvent.selectOptions(visualizationTypeInput, ["mixed-chart"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockMixedChart(emptyResponseServerUrl);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockMixedChart(emptyResponseServerUrl);
  await goToTab(tabName);
  emptyResponseServer.close();

  expect(await screen.findByText(/Disconnected/i)).toBeInTheDocument();
});

test("should show configuration errors if wrongly configured", async () => {
  const addLineDatasetButton = await screen.findByText(/^add line dataset$/i);
  userEvent.click(addLineDatasetButton);

  const addBarDatasetButton = await screen.findByText(/^add bar dataset$/i);
  userEvent.click(addBarDatasetButton);

  await goToTab(tabName);
  const expectedErrorMessages = [
    /'Data Source URL' is not a valid websocket URL/,
    /'Sort by' should be a comma separated list of fields, with descending fields having a '-' suffix/,
    /'Lifespan of each Datapoint in seconds' should be set if 'Append new data to old data' is true/,
    /'name \[line dataset\]' is required/,
    /'label \[line dataset\]' is required/,
    /'color \[line dataset\]' is required/,
    /'x-axis field \[line dataset\]' is required/,
    /'y-axis field \[line dataset\]' is required/,
    /'name \[bar dataset\]' is required/i,
    /'label \[bar dataset\]' is required/i,
    /'color \[bar dataset\]' is required/i,
    /'x-axis field \[bar dataset\]' is required/i,
    /'y-axis field \[bar dataset\]' is required/i,
  ];

  for (let msg of expectedErrorMessages) {
    expect(screen.getByText(msg)).toBeInTheDocument();
  }
});

test("should show error if data is not isMultiple", async () => {
  await setUpMockMixedChart(singleDatasetServerUrl);
  await goToTab(tabName);
  expect(
    await screen.findByText(/Only multiple datasets supported here/i)
  ).toBeInTheDocument();
});

/**
 * Sets up the mixed chart mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockMixedChart(dataSourceUrl: string) {
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

  // add line datasets
  const lineDatasetConfigs: { name: string; label: string; color: string }[] = [
    {
      name: '"Fossil Gas"',
      label: "fossil gas",
      color: "#fae345",
    },
    { name: '"Biomass"', label: "biomass", color: "#000645" },
    { name: '"Fossil Oil"', label: "fossil oil", color: "#ffffff" },
  ];

  const addLineDatasetButton = await screen.findByText(/^add line dataset$/i);
  for (let i = 0; i < lineDatasetConfigs.length; i++) {
    userEvent.click(addLineDatasetButton);
  }

  const lineNameInputs = await screen.findAllByLabelText(
    /^name \[line dataset\]\*$/
  );
  const lineLabelInputs = await screen.findAllByLabelText(
    /^label \[line dataset\]\*$/
  );
  const lineColorInputs = screen.getAllByLabelText(
    /^color \[line dataset\]\*$/
  );
  const lineXAxisFieldInputs = screen.getAllByLabelText(
    /^x-axis field \[line dataset\]/i
  );
  const lineYAxisFieldInputs = screen.getAllByLabelText(
    /^y-axis field \[line dataset\]/i
  );

  for (let i = 0; i < lineDatasetConfigs.length; i++) {
    const config = lineDatasetConfigs[i];
    userEvent.clear(lineNameInputs[i]);
    userEvent.type(lineNameInputs[i], config.name);

    userEvent.clear(lineLabelInputs[i]);
    userEvent.type(lineLabelInputs[i], config.label);

    userEvent.clear(lineColorInputs[i]);
    userEvent.type(lineColorInputs[i], config.color);

    userEvent.clear(lineXAxisFieldInputs[i]);
    userEvent.type(lineXAxisFieldInputs[i], "settlementPeriod");

    userEvent.clear(lineYAxisFieldInputs[i]);
    userEvent.type(lineYAxisFieldInputs[i], "quantity");
  }

  // add bar datasets
  const barDatasetConfigs: { name: string; label: string; color: string }[] = [
    {
      name: '"Fossil Gas"',
      label: "fossil gas",
      color: "#0005cc",
    },
    { name: '"Biomass"', label: "biomass", color: "#ffffff" },
    { name: '"Fossil Oil"', label: "fossil oil", color: "#567345" },
  ];

  const addBarDatasetButton = await screen.findByText(/^add bar dataset$/i);
  for (let i = 0; i < lineDatasetConfigs.length; i++) {
    userEvent.click(addBarDatasetButton);
  }

  const barNameInputs = await screen.findAllByLabelText(
    /^name \[bar dataset\]\*$/
  );
  const barLabelInputs = await screen.findAllByLabelText(
    /^label \[bar dataset\]\*$/
  );
  const barColorInputs = screen.getAllByLabelText(/^color \[bar dataset\]\*$/);
  const barXAxisFieldInputs = screen.getAllByLabelText(
    /^x-axis field \[bar dataset\]/i
  );
  const barYAxisFieldInputs = screen.getAllByLabelText(
    /^y-axis field \[bar dataset\]/i
  );

  for (let i = 0; i < barDatasetConfigs.length; i++) {
    const config = lineDatasetConfigs[i];
    userEvent.clear(barNameInputs[i]);
    userEvent.type(barNameInputs[i], config.name);

    userEvent.clear(barLabelInputs[i]);
    userEvent.type(barLabelInputs[i], config.label);

    userEvent.clear(barColorInputs[i]);
    userEvent.type(barColorInputs[i], config.color);

    userEvent.clear(barXAxisFieldInputs[i]);
    userEvent.type(barXAxisFieldInputs[i], "settlementPeriod");

    userEvent.clear(barYAxisFieldInputs[i]);
    userEvent.type(barYAxisFieldInputs[i], "quantity");
  }
}
