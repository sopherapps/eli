/**
 * Moduel cotnaing the visual for line charts
 */

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function LineChartVisual({
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

  const errorMessage = useMemo(
    () => (data.isMultiple ? "Multiple datasets not supported here." : ""),
    [data.isMultiple]
  );

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
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
    data.data,
    xField,
    yField,
  ]);

  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}.</div>
      ) : (
        <Line
          data={chartData}
          width={width * windowWidth}
          height={height * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
