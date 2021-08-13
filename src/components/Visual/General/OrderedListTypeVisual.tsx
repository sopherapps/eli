/**
 * Module containing the visual for ordered lists
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";

export default function OrderedListVisual({
  configObject,
  data,
}: {
  configObject: { [key: string]: VisualizationProp };
  data: ClientJson;
}) {
  const recordIds = useMemo(() => Object.keys(data.data).sort(), [data.data]);
  const valueField = configObject.valueField.value;
  return (
    <ol
      className="data-ui"
      style={{
        listStyleType: configObject.style.value || "inherit",
      }}
    >
      {recordIds.map((id) => (
        <li key={id}>{data.data[id][valueField]}</li>
      ))}
    </ol>
  );
}
