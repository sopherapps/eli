/**
 * Module containing the input for text
 */

import { EventHandler } from "react";

export default function TextInput({
  id,
  name,
  label,
  onEdit,
  value,
  error,
  required,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string;
  error: string | undefined;
  required?: boolean;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <div className="eli-form-control">
        <input
          id={id}
          type="text"
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
