/**
 * Module containing the component that conditionaly renders a given visualization
 */
import React, { useState } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { ClientJson, Visualization } from "../../../data/types";
import GeneralVisual from "./GeneralVisual";

export default function VisualizationBody({
  visualization,
}: {
  visualization: Visualization;
}) {
  const historicalData = useRef<ClientJson>();
  const [clientData, setClientData] = useState<ClientJson>();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event>();

  useLayoutEffect(() => {
    const connection = new WebSocket(visualization.dataSourceUrl);
    connection.onmessage = (event) => {
      setIsConnected(true);
      setError(undefined);

      const parsedData: ClientJson = JSON.parse(event.data);
      if (visualization.shouldAppendNewData) {
        historicalData.current = {
          ...(historicalData || {}),
          ...parsedData,
          data: { ...(historicalData.current?.data || {}), ...parsedData.data },
        };
        setClientData(historicalData.current);
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
