/**
 * Module containing the visual for unordered lists
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";

export default function UnorderedListVisual({
  height,
  width,
  configObject,
  data,
}: {
  height: number;
  width: number;
  configObject: { [key: string]: VisualizationProp };
  data: ClientJson;
}) {
  const recordIds = useMemo(() => Object.keys(data.data).sort(), [data.data]);
  const valueField = configObject.valueField.value;
  return (
    <ul
      className="data-ui"
      style={{
        height,
        width,
        listStyleType: configObject.style.value || "inherit",
      }}
    >
      {recordIds.map((id) => (
        <li key={id}>{data.data[id][valueField]}</li>
      ))}
    </ul>
  );
}
