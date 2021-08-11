/**
 * Module containing the component that conditionaly renders a given visualization
 */

import React, { useCallback, useState } from "react";
import { ClientJson, Visualization } from "../../../data/types";
import useWebsocket from "../../../hooks/useWebsocket";
import GeneralVisual from "./GeneralVIsual";

export default function VisualizationBody({
  visualization,
}: {
  visualization: Visualization;
}) {
  const dummyClientJson: ClientJson = {
    isMultiple: false,
    meta: { primaryFields: [], separator: "" },
    data: {},
  };
  const [clientData, setClientData] = useState(dummyClientJson);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setConnected] = useState(false);

  const appendData = useCallback(
    (newData: ClientJson) => {
      setErrorMessage("");
      setClientData({
        ...clientData,
        ...newData,
        data: { ...clientData.data, ...newData.data },
      });
    },
    [clientData]
  );

  const reportError = useCallback((event: Event) => {
    setErrorMessage(event.type);
    console.error(event);
  }, []);

  const reportConnectionSuccess = useCallback((event: Event) => {
    setConnected(true);
  }, []);

  const reportDisconnection = useCallback((event: Event) => {
    setConnected(false);
  }, []);

  useWebsocket(visualization.dataSourceUrl, {
    onMessage: appendData,
    onError: reportError,
    onConnection: reportConnectionSuccess,
    onDisconnection: reportDisconnection,
  });

  if (!isConnected) {
    return <div>Disconnected</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

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
