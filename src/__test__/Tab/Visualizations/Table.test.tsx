/**
 * Module containing tests for the Table visualization
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
const columnOrder: string[] = [
  "settlementDate",
  "settlementPeriod",
  "quantity",
  "unitOfMeasure",
  "activeFlag",
  "businessType",
  "documentID",
];
const emptyResponseServerUrl = "ws://table-empty-response.com";
const singleDatasetServerUrl = "ws://table-single-dataset-response.com";
const multipleDatasetServerUrl = "ws://table-multiple-dataset-response.com";
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
  userEvent.selectOptions(visualizationTypeInput, ["table"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockTable(emptyResponseServerUrl, columnOrder);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockTable(emptyResponseServerUrl, columnOrder);
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
    /'column order \(comma separated\)' is required/,
  ];

  for (let msg of expectedErrorMessages) {
    expect(screen.getByText(msg)).toBeInTheDocument();
  }
});

test("should show error if data is isMultiple", async () => {
  await setUpMockTable(multipleDatasetServerUrl, columnOrder);
  await goToTab(tabName);
  expect(
    await screen.findByText(/Multiple datasets not supported here/i)
  ).toBeInTheDocument();
});

test("should display the table as expected", async () => {
  const expectedTableData = [
    [
      "settlementDate",
      "settlementPeriod",
      "quantity",
      "unitOfMeasure",
      "activeFlag",
      "businessType",
      "documentID",
    ],
    [
      "2021-08-25",
      "34",
      "38342",
      "Mega watt",
      "Y",
      "Consumption",
      "NGET-EMFIP-ATL-06392204",
    ],
    [
      "2021-08-25",
      "35",
      "38615",
      "Mega watt",
      "Y",
      "Consumption",
      "NGET-EMFIP-ATL-06392205",
    ],
    [
      "2021-08-25",
      "36",
      "38484",
      "Mega watt",
      "Y",
      "Consumption",
      "NGET-EMFIP-ATL-06392206",
    ],
  ];
  await setUpMockTable(singleDatasetServerUrl, columnOrder);
  await goToTab(tabName);

  const expectedDocumentIDs: string[] = [
    "NGET-EMFIP-ATL-06392206",
    "NGET-EMFIP-ATL-06392205",
    "NGET-EMFIP-ATL-06392204",
  ];
  // Ensure all data has been sent
  for (let docId of expectedDocumentIDs) {
    await screen.findByText(docId);
  }

  const headers = screen.getAllByRole("columnheader");
  const rows = screen.getAllByRole("row");

  const rowsValueMatrix: string[][] = [];
  for (let row of rows) {
    const rowValues: string[] = [];
    for (let i = 0; i < row.children.length; i++) {
      rowValues.push(row.children[i].innerHTML);
    }
    rowsValueMatrix.push(rowValues);
  }

  const headerNames = headers.map((elem) => elem.innerHTML);

  expect(headerNames).toEqual(columnOrder);
  expect(headerNames).toEqual(rowsValueMatrix[0]);
  expect(rowsValueMatrix).toEqual(expectedTableData);
});
/**
 * Sets up the table mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockTable(dataSourceUrl: string, columnOrder: string[]) {
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

  // set the columnOrder
  const columnOrderInput = await screen.findByLabelText(/^column order/i);
  userEvent.clear(columnOrderInput);
  userEvent.type(columnOrderInput, columnOrder.join(","));
}
