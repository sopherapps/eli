/**
 * Module containing the visual for showing texts
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";
import sortByField from "../../../utils/sort-records";

export default function TextTypeVisual({
  configObject,
  data,
  sortBy,
}: {
  configObject: { [key: string]: VisualizationProp };
  data: ClientJson;
  sortBy: string;
}) {
  const valueField = configObject.valueField.value;
  const { primaryFields, separator } = data.meta;

  const [sortedRecords, errorMessage] = useMemo(() => {
    const datasets: { [key: string]: { [key: string]: any }[] } = {};
    let errorValue = "";

    if (data.isMultiple) {
      for (let datasetName in data.data) {
        [datasets[datasetName], errorValue] = sortByField(
          sortBy,
          data.data[datasetName]
        );

        if (errorValue) {
          break;
        }
      }
    } else {
      [datasets[""], errorValue] = sortByField(sortBy, data.data);
    }

    return [datasets, errorValue];
  }, [data.data, data.isMultiple, sortBy]);

  return (
    <div
      className="data-ui"
      data-testid="data-ui"
      style={{
        textAlign: configObject.alignment.value,
        fontWeight: configObject.bold.value ? "bold" : "normal",
        fontStyle: configObject.italic.value ? "italic" : "normal",
      }}
    >
      {errorMessage ? (
        <span className="error">{errorMessage}</span>
      ) : (
        Object.keys(sortedRecords)
          .sort()
          .map((dataset) =>
            Object.values(sortedRecords[dataset]).map((record) => (
              <p
                style={{ fontSize: `${configObject.fontSize.value}px` }}
                data-testid="text-item"
                key={`${dataset}-${primaryFields
                  .map((field) => record[field])
                  .join(separator)}`}
              >
                <strong>
                  <em>{dataset}</em>
                </strong>{" "}
                {record[valueField]}
              </p>
            ))
          )
      )}
    </div>
  );
}
