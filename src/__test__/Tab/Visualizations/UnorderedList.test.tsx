/**
 * Module containing tests for the Unordered List visualization
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
const emptyResponseServerUrl = "ws://unordered-list-empty-response.com";
const singleDatasetServerUrl =
  "ws://unordered-list-single-dataset-response.com";
const multipleDatasetServerUrl =
  "ws://unordered-list-multiple-dataset-response.com";
const emptyResponseJsonPath = resolve("src/assets/json/empty-response.json");
const singleDatasetResponseJsonPath = resolve(
  "src/assets/json/single-dataset-response.json"
);
const multipleDatasetResponseJsonPath = resolve(
  "src/assets/json/multiple-dataset-response.json"
);
const intervalInMs = 10;

beforeEach(async () => {
  emptyResponseServer = createWebSocketMockServer(
    emptyResponseServerUrl,
    intervalInMs,
    emptyResponseJsonPath
  );
  singleDatasetServer = createWebSocketMockServer(
    singleDatasetServerUrl,
    intervalInMs,
    singleDatasetResponseJsonPath
  );
  multipleDatasetServer = createWebSocketMockServer(
    multipleDatasetServerUrl,
    intervalInMs,
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
  userEvent.selectOptions(visualizationTypeInput, ["unordered-list"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockUnorderedList(emptyResponseServerUrl, true);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockUnorderedList(emptyResponseServerUrl, true);
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
    /'value field' is required/,
  ];

  for (let msg of expectedErrorMessages) {
    expect(screen.getByText(msg)).toBeInTheDocument();
  }
});

test("should show dataset name and value if data is isMultiple and append is true", async () => {
  const expectedOutput = [
    '"Biomass" 1769',
    '"Biomass" 1803',
    '"Fossil Gas" 14341',
    '"Fossil Gas" 14722',
    '"Fossil Hard coal" 228',
    '"Fossil Hard coal" 231',
    '"Fossil Oil" 0',
    '"Fossil Oil" 0',
    '"Hydro Pumped Storage" 0',
    '"Hydro Pumped Storage" 297',
    '"Hydro Run-of-river and poundage" 239',
    '"Hydro Run-of-river and poundage" 395',
    '"Nuclear" 5245',
    '"Nuclear" 5255',
    '"Other" 141',
    '"Other" 152',
    '"Solar" 3560',
    '"Solar" 2840',
    '"Wind Offshore" 2820.374',
    '"Wind Offshore" 2850.794',
    '"Wind Onshore" 1108.301',
    '"Wind Onshore" 1164.113',
  ];
  const expectedQuantities = [
    /^1803$/,
    /^14722$/,
    /^231$/,
    /^0$/,
    /^297$/,
    /^395$/,
    /^5255$/,
    /^152$/,
    /^2840$/,
    /^2850.794$/,
    /^1164.113$/,
    /^1769$/,
    /^14341$/,
    /^228$/,
    /^239$/,
    /^5245$/,
    /^141$/,
    /^3560$/,
    /^2820.374$/,
    /^1108.301$/,
  ];
  await setUpMockUnorderedList(multipleDatasetServerUrl, true, "quantity");
  await goToTab(tabName);

  // make sure all messages have arrived
  for (let quantity of expectedQuantities) {
    expect(await screen.findAllByText(quantity)).not.toBeNull();
  }

  const allListItems = screen.getAllByTestId("unordered-list-item");
  const textsInListItems = allListItems.map((elem) => elem.textContent);
  expect(textsInListItems).toEqual(expectedOutput);
});

test("should show dataset name and value if data is isMultiple and append is false", async () => {
  const expectedOutput = [
    '"Biomass" 1769',
    '"Fossil Gas" 14341',
    '"Fossil Hard coal" 228',
    '"Fossil Oil" 0',
    '"Hydro Pumped Storage" 0',
    '"Hydro Run-of-river and poundage" 239',
    '"Nuclear" 5245',
    '"Other" 141',
    '"Solar" 3560',
    '"Wind Offshore" 2820.374',
    '"Wind Onshore" 1108.301',
  ];
  const expectedQuantities = [
    /^1769$/,
    /^14341$/,
    /^228$/,
    /^0$/,
    /^239$/,
    /^5245$/,
    /^141$/,
    /^3560$/,
    /^2820.374$/,
    /^1108.301$/,
  ];
  await setUpMockUnorderedList(multipleDatasetServerUrl, false, "quantity");
  await goToTab(tabName);

  // make sure all messages have arrived
  for (let quantity of expectedQuantities) {
    expect(await screen.findAllByText(quantity)).not.toBeNull();
  }

  const allListItems = screen.getAllByTestId("unordered-list-item");
  const textsInListItems = allListItems.map((elem) => elem.textContent);
  expect(textsInListItems).toEqual(expectedOutput);
});

test("should display the unordered-list as expected when append data is true", async () => {
  await setUpMockUnorderedList(singleDatasetServerUrl, true);
  await goToTab(tabName);

  const expectedDocumentIDs: string[] = [
    "NGET-EMFIP-ATL-06392206",
    "NGET-EMFIP-ATL-06392205",
    "NGET-EMFIP-ATL-06392204",
  ];

  for (let docId of expectedDocumentIDs) {
    expect(await screen.findByText(docId)).toBeInTheDocument();
  }
});

test("should display the unordered-list as expected when append data is false", async () => {
  await setUpMockUnorderedList(singleDatasetServerUrl, false);
  await goToTab(tabName);

  const latestDocumentId = "NGET-EMFIP-ATL-06392206";
  const otherDocumentIDs: string[] = [
    "NGET-EMFIP-ATL-06392205",
    "NGET-EMFIP-ATL-06392204",
  ];

  expect(await screen.findByText(latestDocumentId)).toBeInTheDocument();
  // Ensure all data has been sent
  for (let docId of otherDocumentIDs) {
    expect(screen.queryByText(docId)).toBeNull();
  }
});

test("should display the list item with the set list style type", async () => {
  const newListStyleType = "square";
  await setUpMockUnorderedList(singleDatasetServerUrl, false);

  const listStyleInput = screen.getByLabelText(/^style$/i);
  userEvent.selectOptions(listStyleInput, [newListStyleType]);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.listStyleType).toBe(newListStyleType);
});

/**
 * Sets up the unordered-list mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockUnorderedList(
  dataSourceUrl: string,
  shouldAppendNewData: boolean,
  valueField = "documentID"
) {
  // set the data source URL
  const dataSourceUrlInput = await screen.findByLabelText(/Data Source URL/i);
  userEvent.clear(dataSourceUrlInput);
  userEvent.type(dataSourceUrlInput, dataSourceUrl);

  // set sortby
  const sortByInput = await screen.findByLabelText(/Sort by/i);
  userEvent.clear(sortByInput);
  userEvent.type(sortByInput, "settlementDate,settlementPeriod");

  // unset shouldAppendNewData
  if (!shouldAppendNewData) {
    const shouldAppendNewDataInput = await screen.findByLabelText(
      /^Append new data to old data?/i
    );
    userEvent.click(shouldAppendNewDataInput);
  } else {
    // set lifespan
    const lifeSpanInput = await screen.findByLabelText(/^Lifespan/i);
    userEvent.clear(lifeSpanInput);
    userEvent.type(lifeSpanInput, "7200");
  }

  // set the value field
  const valueFieldInput = await screen.findByLabelText(/^value field/i);
  userEvent.clear(valueFieldInput);
  userEvent.type(valueFieldInput, valueField);
}
