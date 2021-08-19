/**
 * Module containing the Textarea input for long text
 */

import { EventHandler } from "react";

export default function TextArea({
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
        {required && "*"}
      </label>
      <div className="eli-form-control">
        <textarea
          id={id}
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
