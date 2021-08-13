/**
 * Module containing the component that conditionaly renders a given visualization
 */
import React, { useState } from "react";
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
  const [error, setError] = useState<Event>();

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
    const connection = new WebSocket(visualization.dataSourceUrl);
    connection.onmessage = (event) => {
      setIsConnected(true);
      setError(undefined);

      const parsedData: ClientJson = JSON.parse(event.data);
      if (visualization.shouldAppendNewData) {
        historicalData.current[new Date().getTime()] = parsedData;
        console.log({ parsedData });
        let obj: ClientJson = {
          isMultiple: false,
          meta: { separator: "", primaryFields: [] },
          data: {},
        };

        if (parsedData.isMultiple) {
          for (let key in historicalData.current) {
            const message = historicalData.current[key];
            console.log({ message });
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

        console.log({ obj });
        setClientData(obj);
      } else {
        setClientData(parsedData);
      }
    };

    connection.onerror = (event) => setError(event);
    connection.onopen = () => setIsConnected(true);
    connection.onclose = () => setIsConnected(false);

    return () => connection.close();
  }, [visualization.dataSourceUrl, visualization.shouldAppendNewData]);

  if (!isConnected) {
    return <div>Disconnected</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (clientData) {
    return (
      <GeneralVisual
        data={clientData}
        type={visualization.type.name}
        width={visualization.width}
        height={visualization.height}
        config={visualization.type.config}
      />
    );
  }

  return <div>No data</div>;
}
