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
  error,
  required,
}: {
  name: string;
  id: string;
  onEdit: EventHandler<any>;
  label: string;
  value: any;
  options: any[];
  error: string | undefined;
  required?: boolean;
}) {
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <div className="eli-form-control">
        <select
          id={id}
          className="sole-control"
          data-name={name}
          onChange={onEdit}
          defaultValue={value}
          required={required}
        >
          {options.map((option) => (
            <option data-name={name} value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
