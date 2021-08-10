/**
 * Module containing the HTML checkbox input
 */

import { EventHandler } from "react";

export default function CheckboxInput({
  id,
  name,
  label,
  onEdit,
  value,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: boolean;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        className="eli-form-control"
        checked={value}
        data-name={name}
        onChange={onEdit}
      />
    </div>
  );
}
