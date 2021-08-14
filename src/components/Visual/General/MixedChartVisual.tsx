/**
 * Moduel cotnaing the visual for mixed charts with multiple datasets
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

interface MixedDatasetConfig {
  type: string;
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
  fill?: boolean;
  borderDash?: number[];
}

export default function MixedChartVisual({
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

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: configObject.barChartStyle.value === "stacked",
        },
        y: {
          stacked: configObject.barChartStyle.value === "stacked",
        },
      },
    }),
    [configObject.barChartStyle.value, configObject.orientation.value]
  );

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets: MixedDatasetConfig[] = [];

    for (let dataset in data.data) {
      const xField = datasetConfigs[dataset]?.xField.value;
      const yField = datasetConfigs[dataset]?.yField.value;
      const type = datasetConfigs[dataset]?.type.value;

      const datasetConfig: MixedDatasetConfig = {
        type,
        label: dataset,
        data: [],
        borderColor: datasetConfigs[dataset]?.color?.value || "#fff",
        backgroundColor:
          datasetConfigs[dataset]?.areaUnderTheLineColor?.value ||
          datasetConfigs[dataset]?.color?.value ||
          "#fff",
      };

      if (type === "line") {
        datasetConfig.fill =
          !!datasetConfigs[dataset]?.areaUnderTheLineColor?.value;
        datasetConfig.borderDash =
          datasetConfigs[dataset]?.chartStyle?.value === "dotted"
            ? [5, 5]
            : undefined;
      }

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