/**
 * Moduel cotnaing the visual for doughnut charts
 */

import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import sortByField from "../../../utils/sort-records";
import { generateRandomColor } from "../../../utils/ui-utils";

export default function DoughtnutChartVisual({
  data,
  configObject,
  height,
  width,
  datasetConfigs,
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

  const [sortedRecords, sortError] = useMemo(
    () => sortByField(sortBy, data.data),
    [sortBy, data.data]
  );

  const errorMessage = useMemo(
    () =>
      data.isMultiple ? "Multiple datasets not supported here." : sortError,
    [data.isMultiple, sortError]
  );

  const chartOptions = {};

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const records: number[] = [];
    const backgroundColors: string[] = [];
    const labelField = configObject.labelField.value;
    const valueField = configObject.valueField.value;

    for (let record of sortedRecords) {
      const label = `${record[labelField]}`;
      const color = datasetConfigs[label]?.color.value || generateRandomColor();
      labels.push(label);
      backgroundColors.push(color);
      records.push(record[valueField]);
    }

    return {
      labels,
      datasets: [
        {
          label: "data",
          data: records,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
        },
      ],
    };
  }, [
    configObject.labelField.value,
    configObject.valueField.value,
    datasetConfigs,
    sortedRecords,
  ]);

  return (
    <>
      {errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <Doughnut
          data={chartData}
          width={(width / 100) * windowWidth}
          height={(height / 100) * windowHeight}
          options={chartOptions}
        />
      )}
    </>
  );
}
