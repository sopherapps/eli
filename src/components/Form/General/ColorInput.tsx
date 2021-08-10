/**
 * Moduel containing the HTML input for color
 */

import { EventHandler } from "react";

export default function ColorInput({
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
        <div className="d-flex">
          <input
            id={id}
            type="text"
            className="main-control"
            data-name={name}
            value={value}
            onChange={onEdit}
            autoComplete="off"
            required={required}
          />
          <input
            id={`${id}-color`}
            type="color"
            className="minor-control"
            data-name={name}
            value={value}
            onChange={onEdit}
            required={required}
          />
        </div>
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
