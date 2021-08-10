/**
 * Module containing the input for text
 */

import { EventHandler } from "react";

export default function TextInput({
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
  value: string;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="eli-form-control"
        data-name={name}
        value={value}
        onChange={onEdit}
      />
    </div>
  );
}
