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
  pattern,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string;
  error: string | undefined;
  required?: boolean;
  pattern?: string;
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
          type="text"
          className="sole-control"
          data-name={name}
          value={value}
          onChange={onEdit}
          autoComplete="off"
          required={required}
          pattern={pattern}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
