/* eslint-disable no-native-reassign */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { WebSocket } from "mock-socket";
import MockStorage from "./utils/mock-storage";

window.WebSocket = WebSocket;
beforeAll(() => {
  localStorage = new MockStorage();
  sessionStorage = new MockStorage();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
