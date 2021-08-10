/**
 * Module containing the component for displaying and updating number ranges
 */
import { EventHandler } from "react";

export default function RangeInput({
  id,
  onEdit,
  label,
  value,
  name,
  min,
  max,
  error,
  required,
}: {
  id: string;
  onEdit: EventHandler<any>;
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  error: string | undefined;
  required?: boolean;
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
            type="range"
            max={max}
            min={min}
            className="main-control"
            onChange={onEdit}
            data-name={name}
            value={value}
            required={required}
          />
          <input
            id={`${id}-number`}
            type="number"
            className="minor-control"
            data-name={name}
            min={min}
            max={max}
            value={value}
            required={required}
            onChange={onEdit}
          />
        </div>
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
