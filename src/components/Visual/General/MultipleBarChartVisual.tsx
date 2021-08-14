/**
 * Moduel cotnaing the visual for bar charts with multiple datasets
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

interface BarDatasetConfig {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
}

export default function MultipleBarChartVisual({
  data,
  configObject,
  datasetConfigs,
  height,
  width,
}: {
  data: ClientJson;
  height: number;
  width: number;
  configObject: { [key: string]: VisualizationProp };
  datasetConfigs: { [key: string]: { [key: string]: VisualizationProp } };
}) {
  const xField = configObject.xField.value;
  const yField = configObject.yField.value;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const errorMessage = useMemo(
    () => (!data.isMultiple ? "Only multiple datasets supported here" : ""),
    [data.isMultiple]
  );

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: configObject.chartStyle.value === "stacked",
        },
        y: {
          stacked: configObject.chartStyle.value === "stacked",
        },
      },
    }),
    [configObject.chartStyle.value, configObject.orientation.value]
  );

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets: BarDatasetConfig[] = [];

    for (let dataset in data.data) {
      const datasetConfig: BarDatasetConfig = {
        label: dataset,
        data: [],
        borderColor: datasetConfigs[dataset]?.color?.value || "#fff",
        backgroundColor: datasetConfigs[dataset]?.color?.value || "#fff",
      };

      for (let record of Object.values(data.data[dataset])) {
        const label = `${record[xField]}`;
        if (!labels.includes(label)) {
          labels.push(label);
        }
        datasetConfig.data.push({ x: label, y: record[yField] });
      }
      datasets.push(datasetConfig);
    }

    return {
      labels: labels.sort(),
      datasets,
    };
  }, [data.data, datasetConfigs, xField, yField]);

  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}.</div>
      ) : (
        <Bar
          data={chartData}
          width={width * windowWidth}
          height={height * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
