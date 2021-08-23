/**
 * Module for testing the array utility functions
 */

import { shiftValueBackward, shiftValueForward } from "../array-utils";

test("shiftValueForward should shift forward a given element at index by the specified number of steps", () => {
  const list = ["foo", "bar", "hello", "world", "yeah"];
  expect(shiftValueForward(list, 3, 1)).toEqual(
    expect.arrayContaining(["foo", "bar", "world", "hello", "yeah"])
  );
  expect(shiftValueForward(list, 3, 2)).toEqual(
    expect.arrayContaining(["foo", "world", "bar", "hello", "yeah"])
  );
  expect(shiftValueForward(list, 3, 3)).toEqual(
    expect.arrayContaining(["world", "foo", "bar", "hello", "yeah"])
  );
  expect(shiftValueForward(list, 3, 4)).toEqual(
    expect.arrayContaining(["world", "foo", "bar", "hello", "yeah"])
  );
});

test("shiftValueBackward should shift backward a given element at index by the specified number of steps", () => {
  const list = ["foo", "bar", "hello", "world", "yeah"];
  expect(shiftValueBackward(list, 1, 1)).toEqual(
    expect.arrayContaining(["foo", "hello", "bar", "world", "yeah"])
  );

  expect(shiftValueBackward(list, 1, 2)).toEqual(
    expect.arrayContaining(["foo", "hello", "world", "bar", "yeah"])
  );

  expect(shiftValueBackward(list, 1, 3)).toEqual(
    expect.arrayContaining(["foo", "hello", "world", "yeah", "bar"])
  );

  expect(shiftValueBackward(list, 1, 4)).toEqual(
    expect.arrayContaining(["foo", "hello", "world", "yeah", "bar"])
  );
});
