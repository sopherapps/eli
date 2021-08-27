/**
 * Moduel cotnaing the visual for mixed charts with multiple datasets
 */

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";

interface MixedDatasetConfig {
  type: string;
  label: string;
  data: { [key: string]: any }[]; //{ x: any; y: any }[]
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

  const chartOptions = useMemo(
    () => ({
      indexAxis: configObject.orientation.value === "horizontal" ? "y" : "x",
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
    const datasets: MixedDatasetConfig[] = [];
    const datasetNames = Object.keys(datasetConfigs).sort();

    console.log({ datasetConfigs });

    for (let dataset of datasetNames) {
      for (let datasetConfig of datasetConfigs[dataset] || []) {
        const xField = datasetConfig.xField.value;
        const yField = datasetConfig.yField.value;
        const type = datasetConfig.type.value;

        const config: MixedDatasetConfig = {
          type,
          label: dataset,
          data: [],
          borderColor: datasetConfig.color?.value || "#fff",
          backgroundColor:
            datasetConfig.areaUnderTheLineColor?.value ||
            datasetConfig.color?.value ||
            "#fff",
        };

        if (type === "line") {
          config.fill = !!datasetConfig.areaUnderTheLineColor?.value;
          config.borderDash =
            datasetConfig.chartStyle?.value === "dotted" ? [5, 5] : undefined;
        }

        for (let record of sortedRecords[dataset] || []) {
          const label = `${record[xField]}`;
          if (!labels.includes(label)) {
            labels.push(label);
          }
          config.data.push({
            [labelAxis]: label,
            [valueAxis]: record[yField],
          });
        }
        datasets.push(config);
      }
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
