/**
 * Moduel containing the HTML input for numbers
 */

import { EventHandler } from "react";

export default function NumberInput({
  id,
  name,
  label,
  onEdit,
  value,
  min,
  max,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  onEdit: EventHandler<any>;
  value: string;
  required?: boolean;
  error: string | undefined;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <div className="eli-form-control">
        <input
          id={id}
          type="number"
          className="sole-control"
          min={min}
          max={max}
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
