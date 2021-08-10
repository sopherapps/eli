/**
 * Module containing the input for select elements
 */

import { EventHandler } from "react";

export default function Select({
  name,
  id,
  label,
  onEdit,
  value,
  options,
}: {
  name: string;
  id: string;
  onEdit: EventHandler<any>;
  label: string;
  value: any;
  options: any[];
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="eli-form-control"
        data-name={name}
        onChange={onEdit}
        defaultValue={value}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
