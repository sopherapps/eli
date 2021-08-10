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
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: string;
  step?: number;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="time"
        className="eli-form-control"
        data-name={name}
        value={value}
        onChange={onEdit}
        step={step}
      />
    </div>
  );
}
