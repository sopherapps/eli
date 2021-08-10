/**
 * The module contaning hte input for URLs
 */
import { EventHandler } from "react";

export default function URLInput({
  id,
  onEdit,
  value,
  label,
  name,
  error,
  required,
  pattern,
}: {
  id: string;
  value: string;
  label: string;
  name: string;
  error: string | undefined;
  required?: boolean;
  pattern?: string;
  onEdit: EventHandler<any>;
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
          type="url"
          className="sole-control"
          onChange={onEdit}
          data-name={name}
          value={value}
          autoComplete="off"
          required={required}
          pattern={pattern}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
