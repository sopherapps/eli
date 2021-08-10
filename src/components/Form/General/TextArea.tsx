/**
 * Module containing the Textarea input for long text
 */

import { EventHandler } from "react";

export default function TextArea({
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
      <textarea
        id={id}
        className="eli-form-control"
        data-name={name}
        value={value}
        onChange={onEdit}
      />
    </div>
  );
}
