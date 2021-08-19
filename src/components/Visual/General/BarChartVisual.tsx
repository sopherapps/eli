/**
 * Moduel cotnaing the visual for bar charts
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

export default function BarChartVisual({
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

  const errorMessage = useMemo(() => {
    if (data.isMultiple) {
      return "Multiple datasets not supported here.";
    } else if (configObject.chartStyle.value === "stacked") {
      return "Stacked Charts are only available in the multiple bar chart.";
    }
    return sortError;
  }, [data.isMultiple, configObject.chartStyle.value, sortError]);

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
          backgroundColor: configObject.color.value || "#fff",
          borderColor: configObject.color.value || "#fff",
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
        <div className="error">{errorMessage}.</div>
      ) : (
        <Bar
          data={chartData}
          width={(width / 100) * windowWidth}
          height={(height / 100) * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
