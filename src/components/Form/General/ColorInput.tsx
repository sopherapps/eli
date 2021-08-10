/**
 * Moduel containing the HTML input for color
 */

import { EventHandler } from "react";

export default function ColorInput({
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
      <div className="eli-form-control d-flex">
        <input
          id={id}
          type="text"
          className="eli-form-control"
          data-name={name}
          value={value}
          onChange={onEdit}
          autoComplete="off"
        />
        <input
          id={`${id}-color`}
          type="color"
          className="eli-form-control"
          data-name={name}
          value={value}
          onChange={onEdit}
        />
      </div>
    </div>
  );
}
