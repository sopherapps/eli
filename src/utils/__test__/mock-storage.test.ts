/**
 * Module containing test for the mock-storage utility function
 */

import MockStorage from "../mock-storage";

test("should save a given item under the given key", async () => {
  const storage = new MockStorage();
  const testData: { [key: string]: string } = {
    foo: "bar",
    test: "data",
    hello: "world",
  };
  for (let key in testData) {
    storage.setItem(key, testData[key]);
  }

  for (let key in testData) {
    expect(storage.getItem(key)).toEqual(testData[key]);
  }
});

test("should clear all the data in the store", () => {
  const storage = new MockStorage();
  const testData: { [key: string]: string } = {
    foo: "bar",
    test: "data",
    hello: "world",
  };
  for (let key in testData) {
    storage.setItem(key, testData[key]);
  }

  storage.clear();

  for (let key in testData) {
    expect(storage.getItem(key)).toBeNull();
  }
});

test("should remove item under key with removeItem", () => {
  const storage = new MockStorage();
  const key = "hello";
  const value = "world";
  storage.setItem(key, value);
  storage.removeItem(key);
  expect(storage.getItem(key)).toBeNull();
});
