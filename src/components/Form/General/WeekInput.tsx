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
}: {
  id: string;
  value: string;
  label: string;
  name: string;
  onEdit: EventHandler<any>;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="week"
        className="eli-form-control"
        onChange={onEdit}
        data-name={name}
        value={value}
      />
    </div>
  );
}
