/**
 * Moduel cotnaing the visual for scatter diagrams
 */

import { useMemo } from "react";
import { Scatter } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

export default function ScatterVisual({
  data,
  configObject,
  height,
  width,
  sortBy,
}: {
  data: ClientJson;
  height: number;
  width: number;
  sortBy: string;
  configObject: { [key: string]: VisualizationProp };
}) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [sortedRecords, sortError] = useMemo(
    () => sortByField(sortBy, data.data),
    [sortBy, data.data]
  );

  const errorMessage = useMemo(
    () =>
      data.isMultiple ? "Multiple datasets not supported here." : sortError,
    [data.isMultiple, sortError]
  );

  const chartData = useMemo(() => {
    const xField = configObject.xField.value;
    const yField = configObject.yField.value;

    return {
      datasets: [
        {
          label: configObject.label.value,
          data: sortedRecords.map((record) => ({
            x: record[xField],
            y: record[yField],
          })),
          backgroundColor: configObject.color.value || "#fff",
        },
      ],
    };
  }, [
    configObject.color.value,
    configObject.label.value,
    configObject.xField.value,
    configObject.yField.value,
    sortedRecords,
  ]);
  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <Scatter
          data={chartData}
          width={(width / 100) * windowWidth}
          height={(height / 100) * windowHeight}
          options={{}}
        />
      )}
    </>
  );
}
