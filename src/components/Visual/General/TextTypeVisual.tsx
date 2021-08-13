/**
 * Module containing the visual for showing texts
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";

export default function TextTypeVisual({
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
    <div
      className="data-ui"
      style={{
        height,
        width,
        fontSize: configObject.fontSize.value,
        textAlign: configObject.alignment.value,
        fontWeight: configObject.bold.value ? "bold" : "normal",
        fontStyle: configObject.italic.value ? "italic" : "normal",
      }}
    >
      {!data.isMultiple &&
        recordIds.map((id) => (
          <>
            <span key={id}>{data.data[id][valueField]}</span>
            <br />
          </>
        ))}
      {data.isMultiple &&
        recordIds.map((dataset) =>
          Object.keys(data.data[dataset])
            .sort()
            .map((id) => (
              <>
                <span key={`${dataset}-${id}`}>
                  <em>{dataset}:</em> {data.data[dataset][id][valueField]}
                </span>
                <br />
              </>
            ))
        )}
    </div>
  );
}
