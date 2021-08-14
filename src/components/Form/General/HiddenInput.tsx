/**
 * Module containing the input for text
 */

export default function HiddenInput({
  id,
  name,
  value,
}: {
  id: string;
  name: string;
  value: string;
}) {
  return (
    <input
      id={id}
      type="hidden"
      className="sole-control"
      data-name={name}
      value={value}
    />
  );
}
