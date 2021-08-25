/**
 * Module containing the HTML input that allows any kind of input type for the config (VisualizationProp)
 * And returns an appropriate HTML rendering
 */

import { EventHandler } from "react";
import { VisualizationProp, HTMLInputType } from "../../../data/types";
import CheckboxInput from "../General/CheckboxInput";
import ColorInput from "../General/ColorInput";
import DateInput from "../General/DateInput";
import EmailInput from "../General/EmailInput";
import HiddenInput from "../General/HiddenInput";
import MonthInput from "../General/MonthInput";
import NumberInput from "../General/NumberInput";
import RangeInput from "../General/RangeInput";
import SelectInput from "../General/SelectInput";
import TextArea from "../General/TextArea";
import TextInput from "../General/TextInput";
import TimeInput from "../General/TimeInput";
import URLInput from "../General/URLInput";
import WeekInput from "../General/WeekInput";

export default function GeneralConfigInput({
  config,
  id,
  onEdit,
  error,
}: {
  config: VisualizationProp;
  id: string;
  onEdit: EventHandler<any>;
  error: string | undefined;
}) {
  switch (config.inputType) {
    case HTMLInputType.Checkbox:
      return (
        <CheckboxInput
          id={id}
          name={config.name}
          label={config.label}
          value={config.value ?? config.options?.default}
          onEdit={onEdit}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Color:
      return (
        <ColorInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Date:
      return (
        <DateInput
          id={id}
          name={config.name}
          label={config.label}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Email:
      return (
        <EmailInput
          id={id}
          name={config.name}
          label={config.label}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Month:
      return (
        <MonthInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Number:
      return (
        <NumberInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          min={config.options.min}
          max={config.options.max}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Range:
      return (
        <RangeInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          min={config.options.min}
          max={config.options.max}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Select:
      return (
        <SelectInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          options={config.options.options}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Hidden:
      return <HiddenInput id={id} name={config.name} value={config.value} />;

    case HTMLInputType.Text:
      return (
        <TextInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
          pattern={config.options?.pattern}
        />
      );

    case HTMLInputType.TextArea:
      return (
        <TextArea
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Time:
      return (
        <TimeInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          step={config.options.step}
          error={error || config.error}
          required={config.required}
        />
      );

    case HTMLInputType.Url:
      return (
        <URLInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
          pattern={config.options?.pattern}
        />
      );

    case HTMLInputType.Week:
      return (
        <WeekInput
          id={id}
          label={config.label}
          name={config.name}
          onEdit={onEdit}
          value={config.value ?? config.options?.default}
          error={error || config.error}
          required={config.required}
        />
      );

    default:
      throw new Error(`input type for ${config.name} config not supported`);
  }
}
