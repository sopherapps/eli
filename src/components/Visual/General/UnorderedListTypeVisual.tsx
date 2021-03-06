/**
 * Module containing the visual for unordered lists
 */

import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";
import sortByField from "../../../utils/sort-records";

export default function UnorderedListVisual({
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
    <ul
      className="data-ui"
      data-testid="data-ui"
      style={{
        listStyleType: configObject.style.value || "inherit",
      }}
    >
      {errorMessage ? (
        <span className="error">{errorMessage}</span>
      ) : (
        Object.keys(sortedRecords)
          .sort()
          .map((dataset) =>
            Object.values(sortedRecords[dataset]).map((record) => (
              <li
                data-testid="unordered-list-item"
                key={`${dataset}-${primaryFields
                  .map((field) => record[field])
                  .join(separator)}`}
              >
                <strong>
                  <em>{dataset}</em>
                </strong>{" "}
                {record[valueField]}
              </li>
            ))
          )
      )}
    </ul>
  );
}
