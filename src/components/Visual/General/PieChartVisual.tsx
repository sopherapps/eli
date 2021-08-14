/**
 * Moduel cotnaing the visual for bar charts
 */

import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function PieChartVisual({
  data,
  configObject,
  height,
  width,
  datasetConfigs,
}: {
  data: ClientJson;
  height: number;
  width: number;
  configObject: { [key: string]: VisualizationProp };
  datasetConfigs: { [key: string]: { [key: string]: VisualizationProp } };
}) {
  const labelField = configObject.labelField.value;
  const valueField = configObject.valueField.value;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const errorMessage = useMemo(
    () => (data.isMultiple ? "Multiple datasets not supported here." : ""),
    [data.isMultiple]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const records: number[] = [];
    const backgroundColors: string[] = [];

    for (let record of Object.values(data.data)) {
      const label = `${record[labelField]}`;
      const color = datasetConfigs[label]?.color.value || "#fff";
      labels.push(label);
      backgroundColors.push(color);
      records.push(record[valueField]);
    }

    return {
      labels,
      datasets: [
        {
          label: configObject.label.value || "pie chart",
          data: records,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
        },
      ],
    };
  }, [
    configObject.label.value,
    data.data,
    datasetConfigs,
    labelField,
    valueField,
  ]);

  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}.</div>
      ) : (
        <Pie
          data={chartData}
          width={width * windowWidth}
          height={height * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
