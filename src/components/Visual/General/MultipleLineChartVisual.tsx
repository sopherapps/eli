/**
 * Model containing the visual for line charts with multiple datasets
 */

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

interface LineDatasetConfig {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  borderDash?: number[];
}

export default function MultipleLineChartVisual({
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
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const errorMessage = useMemo(
    () => (!data.isMultiple ? "Only multiple datasets supported here" : ""),
    [data.isMultiple]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animations: false,
  };

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets: LineDatasetConfig[] = [];

    for (let dataset in data.data) {
      const datasetConfig: LineDatasetConfig = {
        label: dataset,
        fill: !!datasetConfigs[dataset]?.areaUnderTheLineColor?.value,
        data: [],
        borderColor: datasetConfigs[dataset]?.color?.value || "#fff",
        backgroundColor:
          datasetConfigs[dataset]?.areaUnderTheLineColor?.value ||
          datasetConfigs[dataset]?.color?.value ||
          "#fff",
        borderDash:
          datasetConfigs[dataset]?.chartStyle?.value === "dotted"
            ? [5, 5]
            : undefined,
      };
      const xField = datasetConfigs[dataset]?.xField.value;
      const yField = datasetConfigs[dataset]?.yField.value;

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
      labels,
      datasets,
    };
  }, [data.data, datasetConfigs]);

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
