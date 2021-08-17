/**
 * Moduel cotnaing the visual for bar charts
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function BarChartVisual({
  data,
  configObject,
  height,
  width,
}: {
  data: ClientJson;
  height: number;
  width: number;
  configObject: { [key: string]: VisualizationProp };
}) {
  const xField = configObject.xField.value;
  const yField = configObject.yField.value;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const errorMessage = useMemo(() => {
    if (data.isMultiple) {
      return "Multiple datasets not supported here.";
    } else if (configObject.chartStyle.value === "stacked") {
      return "Stacked Charts are only available in the multiple bar chart.";
    }
    return "";
  }, [data.isMultiple, configObject.chartStyle.value]);

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      animations: false,
    }),
    [configObject.orientation.value]
  );

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const records: { x: string; y: number }[] = [];

    for (let record of Object.values(data.data)) {
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
    data.data,
    xField,
    yField,
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
