/**
 * Module contains the tests for the utility function that prefills local storage
 */

import { tabsKey, tabOrderKey } from "../../config";
import { addMockTabs, mockTabData, mockTabOrderData } from "../prefill-storage";

test("should add the mock tab data to localStorage under the tabsKey", () => {
  expect(tabOrderKey).not.toEqual(tabsKey);
  addMockTabs();
  expect(JSON.parse(localStorage.getItem(tabsKey) || "{}")).toEqual(
    expect.objectContaining(mockTabData)
  );
});

test("should add the mock tab order data to localStorage under the tabsOrderKey", () => {
  addMockTabs();
  expect(JSON.parse(localStorage.getItem(tabOrderKey) || "[]")).toEqual(
    expect.objectContaining(mockTabOrderData)
  );
});
