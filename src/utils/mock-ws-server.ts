/**
 * Module creates mock websocket server
 */

import { Server } from "mock-socket";

/**
 * Creates a mock server that sends the messages in the JSON file at the path passed to the function,
 * at an interval specified
 * @param url - the mock websocket url
 * @param intervalInMillseconds - the interval in milliseconds at which messages are to be sent to the clients
 * @param jsonMockFilePath - the file path to the JSON file containing an array of messages to send back
 * @returns {Server}
 */
export default function createWebSocketMockServer(
  url: string,
  intervalInMillseconds: number,
  jsonMockFilePath: string
): Server {
  const server = new Server(url);

  server.on("connection", (socket) => {
    const intervalHandle = setInterval(() => {}, intervalInMillseconds);
    socket.on("close", () => {
      clearInterval(intervalHandle);
    });
  });

  return server;
}
