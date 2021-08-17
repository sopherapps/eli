/**
 * The module containing the visual for tables
 */

import React, { useMemo } from "react";
import { ClientJson } from "../../../data/types";
import sortByField from "../../../utils/sort-records";

export default function TableTypeVisual({
  data,
  columnOrderString,
  sortBy,
}: {
  data: ClientJson;
  columnOrderString: string;
  sortBy: string;
}) {
  const columnOrder = useMemo(
    () => columnOrderString?.split(","),
    [columnOrderString]
  );
  const { primaryFields, separator } = data.meta;

  const [sortedRecords, sortError] = useMemo(
    () => sortByField(sortBy, data.data),
    [sortBy, data.data]
  );

  const errorMessage = useMemo(
    () =>
      data.isMultiple ? "Multiple datasets not supported here." : sortError,
    [data.isMultiple, sortError]
  );

  return (
    <div className="data-ui">
      {errorMessage ? (
        <span className="error">{errorMessage}</span>
      ) : (
        <table>
          <thead>
            <tr>
              {columnOrder.map((column, index) => (
                <th key={`${column}-${index}`}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {sortedRecords.map((record) => (
                <>
                  {columnOrder.map((column, index) => (
                    <td
                      key={`${primaryFields
                        .map((field) => record[field])
                        .join(separator)}-${column}-${index}`}
                    >
                      {record[column]}
                    </td>
                  ))}
                </>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
