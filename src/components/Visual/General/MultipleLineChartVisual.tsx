/**
 * Model containing the visual for line charts with multiple datasets
 */

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

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
  sortBy,
}: {
  data: ClientJson;
  height: number;
  width: number;
  sortBy: string;
  configObject: { [key: string]: VisualizationProp };
  datasetConfigs: { [key: string]: { [key: string]: VisualizationProp }[] };
}) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const [sortedRecords, errorMessage] = useMemo(() => {
    const datasets: { [key: string]: { [key: string]: any }[] } = {};
    let errorValue = "";

    if (!data.isMultiple) {
      return [datasets, "Only multiple datasets supported here"];
    }

    for (let datasetName in data.data) {
      [datasets[datasetName], errorValue] = sortByField(
        sortBy,
        data.data[datasetName]
      );

      if (errorValue) {
        break;
      }
    }

    return [datasets, errorValue];
  }, [data.data, data.isMultiple, sortBy]);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets: LineDatasetConfig[] = [];
    const datasetNames = Object.keys(datasetConfigs).sort();

    for (let dataset of datasetNames) {
      for (let datasetConfig of datasetConfigs[dataset] || []) {
        const config: LineDatasetConfig = {
          label: dataset,
          fill: !!datasetConfig.areaUnderTheLineColor?.value,
          data: [],
          borderColor: datasetConfig.color?.value || "#fff",
          backgroundColor:
            datasetConfig.areaUnderTheLineColor?.value ||
            datasetConfig.color?.value ||
            "#fff",
          borderDash:
            datasetConfig.chartStyle?.value === "dotted" ? [5, 5] : undefined,
        };
        const xField = datasetConfig.xField.value;
        const yField = datasetConfig.yField.value;

        for (let record of sortedRecords[dataset] || []) {
          const label = `${record[xField]}`;
          if (!labels.includes(label)) {
            labels.push(label);
          }
          config.data.push({ x: label, y: record[yField] });
        }
        datasets.push(config);
      }
    }

    return {
      labels,
      datasets,
    };
  }, [datasetConfigs, sortedRecords]);

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
