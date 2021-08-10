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
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string | Date;
  required?: boolean;
  error: string | undefined;
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
      <div className="eli-form-control">
        <input
          id={id}
          type="date"
          className="sole-control"
          data-name={name}
          value={stringifiedDate}
          onChange={onEdit}
          autoComplete="off"
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
