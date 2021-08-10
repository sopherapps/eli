/**
 * Moduel containing the HTML input for months with their years in the format YYYY-MM
 */

import { EventHandler } from "react";

export default function MonthInput({
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
  value: string;
  required?: boolean;
  error: string | undefined;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <div className="eli-form-control">
        <input
          id={id}
          type="month"
          className="sole-control"
          data-name={name}
          value={value}
          onChange={onEdit}
          autoComplete="off"
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
