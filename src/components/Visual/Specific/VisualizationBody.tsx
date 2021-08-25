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

  const errorMessages: string[] = useMemo(() => {
    if (allErrors.length > 0) {
      return allErrors;
    } else if (!isConnected) {
      return ["Disconnected"];
    } else if (error) {
      return [JSON.stringify(error)];
    } else if (!currentData) {
      return ["No Data"];
    }
    return [];
  }, [allErrors, currentData, error, isConnected]);

  useEffect(() => {
    if (allErrors.length > 0) {
      return;
    }

    if (visualization.shouldAppendNewData) {
      const intervalHandle = setInterval(
        () => removeStaleData(visualization),
        1000
      );

      return () => clearInterval(intervalHandle);
    }
  }, [visualization, allErrors]);

  useLayoutEffect(() => {
    if (allErrors.length > 0) {
      return;
    }

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
      }, 2000);
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
  }, [visualization, allErrors]);

  return (
    <>
      {errorMessages.length > 0 || !currentData ? (
        <ul className="error">
          {errorMessages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      ) : (
        <GeneralVisual
          data={currentData}
          type={visualization.type.name}
          config={visualization.type.config}
          height={visualization.height}
          width={visualization.width}
          orderBy={visualization.orderBy}
          datasetIds={visualization.type.datasetIds}
        />
      )}
    </>
  );
}
