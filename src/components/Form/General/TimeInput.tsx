/**
 * Moduel containing the HTML input for dates in the ISO format of YYYY-MM-DD
 */
import { EventHandler } from "react";

export default function TimeInput({
  id,
  name,
  label,
  onEdit,
  value,
  step,
  error,
  required,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string;
  step?: number;
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
          type="time"
          className="sole-control"
          data-name={name}
          value={value}
          onChange={onEdit}
          step={step}
          autoComplete="off"
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
