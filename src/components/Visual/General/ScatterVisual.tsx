/**
 * Moduel cotnaing the visual for scatter diagrams
 */

import { Scatter } from "react-chartjs-2";
import { ClientJson, VisualizationProp } from "../../../data/types";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function ScatterVisual({
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

  if (data.isMultiple) {
    return (
      <div>Multiple datasets are not supported for this visualization.</div>
    );
  }

  const chartData = {
    datasets: [
      {
        label: configObject.label.value,
        data: Object.values(data.data).map((record) => ({
          x: record[xField],
          y: record[yField],
        })),
        backgroundColor: configObject.color.value || "#fff",
      },
    ],
  };
  return (
    <Scatter
      data={chartData}
      width={(width / 100) * windowWidth}
      height={(height / 100) * windowHeight}
      options={{ maintainAspectRatio: false, animations: false }}
    />
  );
}
