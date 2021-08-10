/**
 * Module containing the HTML checkbox input
 */

import { EventHandler } from "react";

export default function CheckboxInput({
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
  value: boolean;
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
          type="checkbox"
          className="sole-control"
          checked={value}
          data-name={name}
          onChange={onEdit}
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
