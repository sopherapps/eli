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
        type="url"
        className="eli-form-control"
        onChange={onEdit}
        data-name={name}
        value={value}
      />
    </div>
  );
}
