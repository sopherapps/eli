/**
 * Module containing tests for the Text visualization
 */
import { fireEvent, render, screen } from "@testing-library/react";
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
const emptyResponseServerUrl = "ws://text-empty-response.com";
const singleDatasetServerUrl = "ws://text-single-dataset-response.com";
const multipleDatasetServerUrl = "ws://text-multiple-dataset-response.com";
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
  userEvent.selectOptions(visualizationTypeInput, ["text"]);
});

afterEach(() => {
  emptyResponseServer && emptyResponseServer.close();
  singleDatasetServer && singleDatasetServer.close();
  multipleDatasetServer && multipleDatasetServer.close();
});

test("should show 'no data' if no data is received", async () => {
  await setUpMockText(emptyResponseServerUrl, true);
  await goToTab(tabName);
  expect(await screen.findByText(/no data/i)).toBeInTheDocument();
});

test("should show 'disconnected' if websocket server disconnects", async () => {
  await setUpMockText(emptyResponseServerUrl, true);
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
  await setUpMockText(multipleDatasetServerUrl, true, "quantity");
  await goToTab(tabName);

  // make sure all messages have arrived
  for (let quantity of expectedQuantities) {
    expect(await screen.findAllByText(quantity)).not.toBeNull();
  }

  const allParagraphs = screen.getAllByTestId("text-item");
  const textsInParagraphs = allParagraphs.map((elem) => elem.textContent);
  expect(textsInParagraphs).toEqual(expectedOutput);
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
  await setUpMockText(multipleDatasetServerUrl, false, "quantity");
  await goToTab(tabName);

  // make sure all messages have arrived
  for (let quantity of expectedQuantities) {
    expect(await screen.findAllByText(quantity)).not.toBeNull();
  }

  const allParagraphs = screen.getAllByTestId("text-item");
  const textsInParagraphs = allParagraphs.map((elem) => elem.textContent);
  expect(textsInParagraphs).toEqual(expectedOutput);
});

test("should display the text as expected when append data is true", async () => {
  await setUpMockText(singleDatasetServerUrl, true);
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

test("should display the text as expected when append data is false", async () => {
  await setUpMockText(singleDatasetServerUrl, false);
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

test("should display the text as italic if italic is set", async () => {
  await setUpMockText(singleDatasetServerUrl, false);

  const italicInput = screen.getByLabelText(/italic/i);
  userEvent.click(italicInput);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.fontStyle).toBe("italic");
});

test("should display the text as bold if bold is set", async () => {
  await setUpMockText(singleDatasetServerUrl, false);

  const boldInput = screen.getByLabelText(/bold/i);
  userEvent.click(boldInput);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.fontWeight).toBe("bold");
});

test("should display the text left aligned if alignment is set to left", async () => {
  await setUpMockText(singleDatasetServerUrl, false);

  const alignmentInput = screen.getByLabelText(/alignment/i);
  userEvent.selectOptions(alignmentInput, ["left"]);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.textAlign).toBe("left");
});

test("should display the text right aligned if alignment is set to right", async () => {
  await setUpMockText(singleDatasetServerUrl, false);

  const alignmentInput = screen.getByLabelText(/alignment/i);
  userEvent.selectOptions(alignmentInput, ["right"]);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.textAlign).toBe("right");
});

test("should display the text center aligned if alignment is set to center", async () => {
  await setUpMockText(singleDatasetServerUrl, false);

  const alignmentInput = screen.getByLabelText(/alignment/i);
  userEvent.selectOptions(alignmentInput, ["center"]);

  await goToTab(tabName);

  const textItemWrapper = await screen.findByTestId("data-ui");
  expect(textItemWrapper.style.textAlign).toBe("center");
});

test("should display the text font size as set", async () => {
  const latestDocumentId = "NGET-EMFIP-ATL-06392206";
  const newFontSize = 30;

  await setUpMockText(singleDatasetServerUrl, false);

  const fontSizeInput = screen.getByLabelText(/font size/i);
  fireEvent.change(fontSizeInput, { target: { value: newFontSize } });

  await goToTab(tabName);

  const textItem = await screen.findByText(latestDocumentId);
  expect(textItem.style.fontSize).toBe(`${newFontSize}px`);
});

/**
 * Sets up the text mock visualization
 * @param dataSourceUrl - the mock webscoket URL from which data is to be got
 */
async function setUpMockText(
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
