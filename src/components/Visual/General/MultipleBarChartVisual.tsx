/**
 * Moduel cotnaing the visual for bar charts with multiple datasets
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

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
  sortBy,
}: {
  data: ClientJson;
  height: number;
  width: number;
  sortBy: string;
  configObject: { [key: string]: VisualizationProp };
  datasetConfigs: { [key: string]: { [key: string]: VisualizationProp } };
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

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
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

  const labelAxis = useMemo(
    () => (configObject.orientation.value === "horizontal" ? "y" : "x"),
    [configObject.orientation.value]
  );

  const valueAxis = useMemo(
    () => (configObject.orientation.value === "horizontal" ? "x" : "y"),
    [configObject.orientation.value]
  );

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const datasets: BarDatasetConfig[] = [];
    const datasetNames = Object.keys(datasetConfigs).sort();

    for (let dataset of datasetNames) {
      const datasetConfig: BarDatasetConfig = {
        label: dataset,
        data: [],
        borderColor: datasetConfigs[dataset]?.color?.value || "#fff",
        backgroundColor: datasetConfigs[dataset]?.color?.value || "#fff",
      };
      const xField = datasetConfigs[dataset]?.xField.value;
      const yField = datasetConfigs[dataset]?.yField.value;

      for (let record of sortedRecords[dataset] || []) {
        const label = `${record[xField]}`;
        if (!labels.includes(label)) {
          labels.push(label);
        }
        // @ts-ignore
        datasetConfig.data.push({
          [labelAxis]: label,
          [valueAxis]: record[yField],
        });
      }
      datasets.push(datasetConfig);
    }

    return {
      labels,
      datasets,
    };
  }, [datasetConfigs, labelAxis, sortedRecords, valueAxis]);

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
