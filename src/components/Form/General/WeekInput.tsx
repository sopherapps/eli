/**
 * The module contaning the input for weeks
 */
import { EventHandler } from "react";

export default function WeekInput({
  id,
  onEdit,
  value,
  label,
  name,
  error,
  required,
}: {
  id: string;
  value: string;
  label: string;
  name: string;
  error: string | undefined;
  required?: boolean;
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
          type="week"
          className="sole-control"
          onChange={onEdit}
          data-name={name}
          value={value}
          autoComplete="off"
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
