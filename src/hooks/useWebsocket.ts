/**
 * Module for connecting and listening, and disconnecting from a websocket
 */

import { useEffect, useMemo, useState } from "react";
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
 * @returns {{connection: WebSocket, isConnected: boolean, error?: Event, message?: ClientJson}}
 */
export default function useWebsocket(
  url: string
  // options: WebsocketOptions
): {
  connection: WebSocket;
  isConnected: boolean;
  error?: Event;
  message?: ClientJson;
} {
  const connection = useMemo(() => new WebSocket(url), [url]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event>();
  const [message, setMessage] = useState<ClientJson>();

  useEffect(() => {
    connection.onmessage = (event) => {
      setError(undefined);
      const parsedData: ClientJson = JSON.parse(event.data);
      setMessage(parsedData);
    };

    connection.onerror = (event) => setError(event);
    connection.onopen = () => setIsConnected(true);
    connection.onclose = () => setIsConnected(false);

    // console.log({ connection });

    return () => connection.close();
  }, [connection]);

  return { connection, isConnected, error, message };
}
