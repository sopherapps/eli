/**
 * Moduel containing the HTML input for numbers
 */

import { EventHandler } from "react";

export default function NumberInput({
  id,
  name,
  label,
  onEdit,
  value,
  min,
  max,
}: {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  onEdit: EventHandler<any>;
  value: string;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        className="eli-form-control"
        min={min}
        max={max}
        data-name={name}
        value={value}
        onChange={onEdit}
        autoComplete="off"
      />
    </div>
  );
}
