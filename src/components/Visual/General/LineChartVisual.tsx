/**
 * Moduel cotnaing the visual for line charts
 */

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

export default function LineChartVisual({
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

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
    }),
    [configObject.orientation.value]
  );

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const records: { x: string; y: number }[] = [];
    const xField = configObject.xField.value;
    const yField = configObject.yField.value;

    for (let record of sortedRecords) {
      const label = `${record[xField]}`;
      labels.push(label);
      records.push({ x: label, y: record[yField] });
    }

    return {
      labels,
      datasets: [
        {
          label: configObject.label.value,
          data: records,
          fill: !!configObject.areaUnderTheLineColor.value,
          backgroundColor:
            configObject.areaUnderTheLineColor?.value ||
            configObject.color.value ||
            "#fff",
          borderColor: configObject.color.value || "#fff",
          borderDash:
            configObject.chartStyle.value === "dotted" ? [5, 5] : undefined,
        },
      ],
    };
  }, [
    configObject.areaUnderTheLineColor.value,
    configObject.chartStyle.value,
    configObject.color.value,
    configObject.label.value,
    configObject.xField.value,
    configObject.yField.value,
    sortedRecords,
  ]);

  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}.</div>
      ) : (
        <Line
          data={chartData}
          width={(width / 100) * windowWidth}
          height={(height / 100) * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
