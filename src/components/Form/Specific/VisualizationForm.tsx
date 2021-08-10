/**
 * Moduel containing the form for configuring visualizations of a given tab
 */

import { EventHandler, useCallback } from "react";
import { visualizationTypeMap, visualizationTypeList } from "../../../data";
import { Visualization } from "../../../data/types";
import RangeInput from "../General/RangeInput";
import SelectInput from "../General/SelectInput";
import URLInput from "../General/URLInput";
import GeneralConfigInput from "./GeneralConfigInput";

export default function VisualizationForm({
  data,
  onEdit,
}: {
  data: Visualization;
  onEdit: EventHandler<any>;
}) {
  const updateConfigFields = useCallback(
    (e) => {
      // @ts-ignore
      const configName = e.target?.dataset.name;
      // @ts-ignore
      const value = e.target?.value;
      onEdit({
        ...e,
        preventDefault: () => e.preventDefault(),
        target: {
          ...e.target,
          checkValidity: () => e.target.checkValidity(),
          dataset: { name: "type" },
          value: {
            ...data.type,
            config: data.type.config.map((item) =>
              item.name !== configName ? item : { ...item, value }
            ),
          },
        },
      });
    },
    [onEdit, data]
  );

  const changeType = useCallback(
    (e) => {
      // @ts-ignore
      const typeAsString = e.target?.value;
      // @ts-ignore
      const configName = e.target?.dataset.name;

      onEdit({
        ...e,
        preventDefault: () => e.preventDefault(),
        target: {
          ...e.target,
          dataset: { name: configName },
          checkValidity: () => e.target.checkValidity(),
          value: visualizationTypeMap[typeAsString],
        },
      });
    },
    [onEdit]
  );

  return (
    <>
      <URLInput
        id={`${data.id}-dataSourceUrl`}
        value={data.dataSourceUrl || ""}
        label="Data Source URL"
        onEdit={onEdit}
        name="dataSourceUrl"
      />
      <RangeInput
        name="width"
        id={`${data.id}-width`}
        label="Width (% of screen)"
        onEdit={onEdit}
        value={data.width || 50}
        max={100}
        min={0}
      />
      <RangeInput
        name="height"
        id={`${data.id}-height`}
        label="Height (% of screen)"
        onEdit={onEdit}
        value={data.height || 50}
        max={100}
        min={0}
      />
      <SelectInput
        name="type"
        id={`${data.id}-type`}
        label="Visualization Type"
        onEdit={changeType}
        value={data.type?.name}
        options={visualizationTypeList}
      />
      {data.type?.config.map((prop) => (
        <GeneralConfigInput
          key={`${data.id}-config-${prop.name}`}
          config={prop}
          id={`${data.id}-config-${prop.name}`}
          onEdit={updateConfigFields}
        />
      ))}
    </>
  );
}
