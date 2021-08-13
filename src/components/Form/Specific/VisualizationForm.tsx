/**
 * Moduel containing the form for configuring visualizations of a given tab
 */

import { EventHandler, useCallback } from "react";
import { visualizationTypeMap, visualizationTypeList } from "../../../data";
import { Visualization, VisualizationProp } from "../../../data/types";
import CheckboxInput from "../General/CheckboxInput";
import NumberInput from "../General/NumberInput";
import RangeInput from "../General/RangeInput";
import SelectInput from "../General/SelectInput";
import URLInput from "../General/URLInput";
import AddMoreConfigButton from "./AddMoreConfigButton";
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
      const error = e.target?.validationMessage;

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
              item.name !== configName ? item : { ...item, value, error }
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

  // adds more configs to the list of configurations of the visualization type
  const addMoreConfigs = useCallback(
    ({ configs, id }: { configs: VisualizationProp[]; id: string }) => {
      onEdit({
        preventDefault: () => {},
        target: {
          dataset: { name: "type" },
          checkValidity: () => {},
          value: {
            ...data.type,
            config: [...data.type.config, ...configs],
            datasetIds: [...(data.type.datasetIds || []), id],
          },
        },
      });
    },
    [onEdit, data]
  );

  return (
    <>
      <URLInput
        id={`${data.id}-dataSourceUrl`}
        value={data.dataSourceUrl || ""}
        label="Data Source URL"
        onEdit={onEdit}
        name="dataSourceUrl"
        error={data.errors?.dataSourceUrl}
        required={true}
        pattern="wss?://.*"
      />
      <RangeInput
        name="width"
        id={`${data.id}-width`}
        label="Width (% of screen)"
        onEdit={onEdit}
        value={data.width || 50}
        max={100}
        min={0}
        error={data.errors?.width}
        required={true}
      />
      <RangeInput
        name="height"
        id={`${data.id}-height`}
        label="Height (% of screen)"
        onEdit={onEdit}
        value={data.height || 50}
        max={100}
        min={0}
        error={data.errors?.height}
        required={true}
      />
      <CheckboxInput
        name="shouldAppendNewData"
        id={`${data.id}-shouldAppendNewData`}
        label="Append new data to old data?"
        onEdit={onEdit}
        value={data.shouldAppendNewData}
        required={true}
        error={data.errors?.shouldAppendNewData}
      />
      {data.shouldAppendNewData && (
        <NumberInput
          name="ttlInSeconds"
          id={`${data.id}-ttlInSeconds`}
          label="Lifespan of each Datapoint in seconds"
          onEdit={onEdit}
          value={data.ttlInSeconds || 3600}
          min={1}
          error={data.errors?.ttlInSeconds}
          required={data.shouldAppendNewData}
        />
      )}
      <SelectInput
        name="type"
        id={`${data.id}-type`}
        label="Visualization Type"
        onEdit={changeType}
        value={data.type?.name}
        options={visualizationTypeList}
        error={data.errors?.type}
        required={true}
      />
      {data.type?.addMoreConfigsButtons?.map((btnConfig, index) => (
        <AddMoreConfigButton
          btnConfig={btnConfig}
          key={`${btnConfig.label}-${index}`}
          updateConfigSet={addMoreConfigs}
        />
      ))}
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
