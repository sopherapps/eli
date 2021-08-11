/**
 * The module containing the visual for tables
 */

import React, { useMemo } from "react";
import { ClientJson } from "../../../data/types";

export default function TableTypeVisual({
  data,
  height,
  width,
  columnOrderString,
}: {
  data: ClientJson;
  height: number;
  width: number;
  columnOrderString: string;
}) {
  const columnOrder = useMemo(
    () => columnOrderString?.split(","),
    [columnOrderString]
  );

  if (data.isMultiple) {
    return (
      <span className="error">
        Data has multiple datasets, which are not supported for the table type
      </span>
    );
  }

  return (
    <div style={{ height, width }}>
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
            {Object.keys(data.data)
              .sort()
              .map((id) => (
                <>
                  {columnOrder.map((column, index) => (
                    <td key={`${id}-${column}-${index}`}>
                      {data.data[id][column]}
                    </td>
                  ))}
                </>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
