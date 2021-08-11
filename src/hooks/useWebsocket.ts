/**
 * Module for connecting and listening, and disconnecting from a websocket
 */

import { useEffect, useMemo } from "react";
import { ClientJson } from "../data/types";

export interface WebsocketOptions {
  onMessage: (data: ClientJson) => void;
  onConnection?: (event: Event) => void;
  onDisconnection?: (event: Event) => void;
  onError?: (event: Event) => void;
}

/**
 * Handles the connection, disconnection, and receiving of ClientJson from any websocket URL
 * @param url - the websocket URL to connect to
 * @param options - the websocket options when connecting
 * @returns {WebSocket}
 */
export default function useWebsocket(
  url: string,
  options: WebsocketOptions
): WebSocket {
  const connection = useMemo(() => new WebSocket(url), [url]);
  useEffect(() => {
    connection.onmessage = (event) => {
      const parsedData: ClientJson = JSON.parse(event.data);
      options.onMessage(parsedData);
    };

    connection.onerror = options.onError || null;
    connection.onopen = options.onConnection || null;
    connection.onclose = options.onDisconnection || null;

    return () => connection.close();
  }, [connection, options]);

  return connection;
}
