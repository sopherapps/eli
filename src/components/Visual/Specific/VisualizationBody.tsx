/**
 * Module containing the component that conditionaly renders a given visualization
 */
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { extractErrors } from "../../../data/errors";
import {
  getCurrentDataFromStore,
  removeStaleData,
  updateStore,
} from "../../../data/store";
import { ClientJson, Visualization } from "../../../data/types";
import GeneralVisual from "./GeneralVisual";

export default function VisualizationBody({
  visualization,
}: {
  visualization: Visualization;
}) {
  const [currentData, setCurrentData] = useState<ClientJson>();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event>();

  const allErrors = useMemo(
    () => extractErrors(visualization),
    [visualization]
  );

  const errorMessage = useMemo(() => {
    if (!isConnected) {
      return "Disconnected";
    } else if (allErrors.length > 0) {
      return allErrors.join(", ");
    } else if (error) {
      return JSON.stringify(error);
    } else if (!currentData) {
      return "No Data";
    }
    return "";
  }, [allErrors, currentData, error, isConnected]);

  useEffect(() => {
    if (visualization.shouldAppendNewData) {
      const intervalHandle = setInterval(
        () => removeStaleData(visualization),
        1000
      );

      return () => clearInterval(intervalHandle);
    }
  }, [visualization]);

  useLayoutEffect(() => {
    let connection = new WebSocket(visualization.dataSourceUrl);
    let restartIntervalHandle: number;
    const onMessageHandler = (event: MessageEvent) => {
      setIsConnected(true);
      setError(undefined);

      const parsedData: ClientJson = JSON.parse(event.data);
      updateStore(visualization, parsedData);

      setCurrentData(
        getCurrentDataFromStore(visualization, parsedData.isMultiple)
      );
    };

    const onErrorHandler = (event: Event) => setError(event);

    const onOpenHandler = () => {
      setIsConnected(true);
      clearInterval(restartIntervalHandle);
    };

    const onCloseHandler = () => {
      setIsConnected(false);
      clearInterval(restartIntervalHandle);

      restartIntervalHandle = window.setInterval(() => {
        if (!connection || connection.readyState === WebSocket.CLOSED) {
          console.log("attempting reconnection...");
          connection = new WebSocket(visualization.dataSourceUrl);
          initializeConnection(connection);
        }
      }, 60000);
    };

    const initializeConnection = (websocket: WebSocket) => {
      connection.onmessage = onMessageHandler;
      connection.onerror = onErrorHandler;
      connection.onopen = onOpenHandler;
      connection.onclose = onCloseHandler;
    };

    initializeConnection(connection);

    return () => {
      connection.onclose = null;
      connection.close();
    };
  }, [visualization]);

  return (
    <>
      {errorMessage || !currentData ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <GeneralVisual
          data={currentData}
          type={visualization.type.name}
          config={visualization.type.config}
          height={visualization.height}
          width={visualization.width}
          orderBy={visualization.orderBy}
        />
      )}
    </>
  );
}
