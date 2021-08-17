/**
 * Module containing the component that conditionaly renders a given visualization
 */
import React, { useMemo, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { ClientJson, Visualization } from "../../../data/types";
import GeneralVisual from "./GeneralVisual";

export default function VisualizationBody({
  visualization,
}: {
  visualization: Visualization;
}) {
  const historicalData = useRef<{ [key: number]: ClientJson }>({});
  const [clientData, setClientData] = useState<ClientJson>();
  const [isConnected, setIsConnected] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(true);
  const [error, setError] = useState<Event>();

  const allErrors = useMemo(() => {
    const emptyValues = ["", undefined, null];
    const mainErrors = Object.values(visualization.errors).filter(
      (value) => !emptyValues.includes(value)
    );
    const configErrors = visualization.type.config
      .map((value) => value.error)
      .filter((value) => !emptyValues.includes(value));

    return [...mainErrors, ...configErrors];
  }, [visualization.errors, visualization.type.config]);

  useEffect(() => {
    if (visualization.shouldAppendNewData) {
      const intervalHandle = setInterval(() => {
        const lastValidTimestamp =
          new Date().getTime() - (visualization.ttlInSeconds || 3) * 1000; // default to 50 minutes

        for (let key in historicalData.current) {
          const timestamp = parseInt(key);

          if (timestamp < lastValidTimestamp) {
            delete historicalData.current[timestamp];
          }
        }
      }, 1000);

      return () => clearInterval(intervalHandle);
    }
  });

  useLayoutEffect(() => {
    let connection = new WebSocket(visualization.dataSourceUrl);
    let restartIntervalHandle: number;
    const onMessageHandler = (event: MessageEvent) => {
      setIsConnected(true);
      setError(undefined);

      const parsedData: ClientJson = JSON.parse(event.data);
      if (visualization.shouldAppendNewData) {
        historicalData.current[new Date().getTime()] = parsedData;
        let obj: ClientJson = {
          isMultiple: false,
          meta: { separator: "", primaryFields: [] },
          data: {},
        };

        if (parsedData.isMultiple) {
          for (let key in historicalData.current) {
            const message = historicalData.current[key];
            obj = { ...obj, ...message, data: { ...obj.data } };

            for (let dataset in message.data) {
              obj.data[dataset] = {
                ...(obj.data[dataset] || {}),
                ...message.data[dataset],
              };
            }
          }
        } else {
          for (let key in historicalData.current) {
            const message = historicalData.current[key];
            obj = {
              ...obj,
              ...message,
              data: { ...obj.data, ...message.data },
            };
          }
        }

        setClientData(obj);
      } else {
        setClientData(parsedData);
      }
    };

    const onErrorHandler = (event: Event) => setError(event);
    const onOpenHandler = () => {
      setIsConnected(true);
      clearInterval(restartIntervalHandle);
    };
    const onCloseHandler = () => {
      setIsConnected(false);
      if (shouldReconnect) {
        clearInterval(restartIntervalHandle);

        restartIntervalHandle = window.setInterval(() => {
          if (!connection || connection.readyState === WebSocket.CLOSED) {
            console.log("attempting reconnection...");
            connection = new WebSocket(visualization.dataSourceUrl);
            initializeConnection(connection);
          }
        }, 60000);
      }
    };

    const initializeConnection = (websocket: WebSocket) => {
      connection.onmessage = onMessageHandler;
      connection.onerror = onErrorHandler;
      connection.onopen = onOpenHandler;
      connection.onclose = onCloseHandler;
    };

    initializeConnection(connection);

    return () => {
      setShouldReconnect(false);
      connection.close();
    };
  }, [
    shouldReconnect,
    visualization.dataSourceUrl,
    visualization.shouldAppendNewData,
  ]);

  if (allErrors.length > 0) {
    return (
      <div>
        <h6>Errors in configuration</h6>
        {allErrors.map((value, index) => (
          <p key={`${value}-${index}`} className="error">
            {value}
          </p>
        ))}
      </div>
    );
  }

  if (!isConnected) {
    return <div>Disconnected</div>;
  }

  if (error) {
    return <div className="error">{JSON.stringify(error)}</div>;
  }

  if (clientData) {
    return (
      <GeneralVisual
        data={clientData}
        type={visualization.type.name}
        config={visualization.type.config}
        height={visualization.height}
        width={visualization.width}
      />
    );
  }

  return <div>No data</div>;
}
