/**
 * Moduel containing the HTML input for dates in the ISO format of YYYY-MM-DD
 */

import { useMemo } from "react";
import { EventHandler } from "react";

export default function DateInput({
  id,
  name,
  label,
  onEdit,
  value,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string | Date;
}) {
  const stringifiedDate = useMemo(() => {
    if (typeof value === "string") {
      return value;
    }
    return value?.toISOString()?.split("T")[0];
  }, [value]);

  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="date"
        className="eli-form-control"
        data-name={name}
        value={stringifiedDate}
        onChange={onEdit}
      />
    </div>
  );
}
