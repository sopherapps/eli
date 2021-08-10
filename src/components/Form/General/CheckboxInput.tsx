/**
 * Module containing the HTML checkbox input
 */

import { useCallback } from "react";
import { EventHandler } from "react";

export default function CheckboxInput({
  id,
  name,
  label,
  onEdit,
  value,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  onEdit: EventHandler<any>;
  value: boolean;
  required?: boolean;
  error: string | undefined;
}) {
  const handleCheck = useCallback(
    (e) => {
      onEdit({
        ...e,
        preventDefault: () => {}, // all the default change occur on the screen. React seems to delay in rendering the new state
        target: {
          ...e.target,
          dataset: { name },
          value: e.target?.checked,
          checkValidity: () => e.target?.checkValidity(),
        },
      });
    },
    [onEdit, name]
  );
  return (
    <div className="eli-form-control-group d-flex">
      <label className="eli-form-control" htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <div className="eli-form-control">
        <input
          id={id}
          type="checkbox"
          className="sole-control"
          checked={value}
          data-name={name}
          onChange={handleCheck}
          required={required}
        />
        {error && <small className="form-error">{error}</small>}
      </div>
    </div>
  );
}
