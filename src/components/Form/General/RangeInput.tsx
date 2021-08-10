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
}: {
  id: string;
  onEdit: EventHandler<any>;
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <div className="eli-form-control d-flex">
        <input
          id={id}
          type="range"
          max={max}
          min={min}
          className="eli-form-control"
          onChange={onEdit}
          data-name={name}
          value={value}
        />
        <input
          id={`${id}-number`}
          type="number"
          className="eli-form-control"
          data-name={name}
          min={min}
          max={max}
          value={value}
          onChange={onEdit}
        />
      </div>
    </div>
  );
}
