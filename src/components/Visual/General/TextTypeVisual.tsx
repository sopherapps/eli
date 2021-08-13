/**
 * Module containing the visual for showing texts
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";

export default function TextTypeVisual({
  configObject,
  data,
}: {
  configObject: { [key: string]: VisualizationProp };
  data: ClientJson;
}) {
  const recordIds = useMemo(() => Object.keys(data.data).sort(), [data.data]);
  const valueField = configObject.valueField.value;

  return (
    <div
      className="data-ui"
      style={{
        fontSize: configObject.fontSize.value,
        textAlign: configObject.alignment.value,
        fontWeight: configObject.bold.value ? "bold" : "normal",
        fontStyle: configObject.italic.value ? "italic" : "normal",
      }}
    >
      {!data.isMultiple
        ? recordIds.map((id) => <p key={id}>{data.data[id][valueField]}</p>)
        : recordIds.map((dataset) =>
            Object.keys(data.data[dataset])
              .sort()
              .map((id) => (
                <p key={`${dataset}-${id}`}>
                  <em>{dataset}:</em> {data.data[dataset][id][valueField]}
                </p>
              ))
          )}
    </div>
  );
}
