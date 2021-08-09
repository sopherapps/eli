// Component to allow editing a visualization
import React, { EventHandler } from "react";
import {
  HTMLInputType,
  Visualization,
  VisualizationProp,
  visualizationTypeList,
  visualizationTypeMap,
} from "../data/models";
import whiteArrowDownIcon from "../assets/images/arrow_downward_white.svg";
import whiteArrowUpIcon from "../assets/images/arrow_upward_white.svg";
import whiteCloseIcon from "../assets/images/close_white.svg";
import { useCallback } from "react";

export default function VisualizationEditCard({
  visualization,
  allowDownShift,
  allowUpShift,
  onEdit,
  onDelete,
  onShiftUp,
  onShiftDown,
}: {
  visualization: Visualization;
  allowUpShift: boolean;
  allowDownShift: boolean;
  onEdit: (id: string, newVisual: Visualization) => void;
  onDelete: (id: string) => void;
  onShiftUp: (id: string) => void;
  onShiftDown: (id: string) => void;
}) {
  const memoizedOnEdit = useCallback(
    (e) => {
      e.preventDefault();
      e.target.checkValidity();
      // @ts-ignore
      const prop = e.target?.dataset.name;
      // @ts-ignore
      const value = e.target?.value;
      onEdit(visualization.id, { ...visualization, [prop]: value });
    },
    [visualization, onEdit]
  );

  const memoizedOnDelete = useCallback(
    (e) => {
      e.preventDefault();
      onDelete(visualization.id);
    },
    [visualization, onDelete]
  );

  const memoizedOnShiftUp = useCallback(
    (e) => {
      e.preventDefault();
      onShiftUp(visualization.id);
    },
    [visualization, onShiftUp]
  );

  const memoizedOnShiftDown = useCallback(
    (e) => {
      e.preventDefault();
      onShiftDown(visualization.id);
    },
    [visualization, onShiftDown]
  );

  return (
    <div className="card">
      <div className="card-header d-flex justify-space-between">
        <input
          type="text"
          className="editable-text"
          spellCheck={true}
          onChange={memoizedOnEdit}
          data-name="title"
          value={visualization.title || ""}
        />
        <div className="card-control d-flex justify-space-between">
          {allowUpShift ? (
            <button className="btn">
              <img
                src={whiteArrowUpIcon}
                alt="move up"
                onClick={memoizedOnShiftUp}
              />
            </button>
          ) : (
            ""
          )}

          {allowDownShift ? (
            <button className="btn">
              <img
                src={whiteArrowDownIcon}
                alt="move down"
                onClick={memoizedOnShiftDown}
              />
            </button>
          ) : (
            ""
          )}

          <button className="btn">
            <img src={whiteCloseIcon} alt="close" onClick={memoizedOnDelete} />
          </button>
        </div>
      </div>
      <div className="card-body list-with-images">
        <VisualizationForm data={visualization} onEdit={memoizedOnEdit} />
      </div>
    </div>
  );
}

function VisualizationForm({
  data,
  onEdit,
}: {
  data: Visualization;
  onEdit: EventHandler<any>;
}) {
  const updateConfigFields = useCallback(
    (e) => {
      e.preventDefault();
      e.target.checkValidity();
      // @ts-ignore
      const configName = e.target?.dataset.name;
      // @ts-ignore
      const value = e.target?.value;
      onEdit({
        ...e,
        target: {
          ...e.target,
          dataset: { ...e.target.dataset, name: "type" },
          value: {
            ...data.type,
            config: data.type.config.map((item) =>
              item.name !== configName ? item : value
            ),
          },
        },
      });
    },
    [onEdit, data]
  );

  const changeType = useCallback(
    (e) => {
      e.preventDefault();
      e.target.checkValidity();
      // @ts-ignore
      const typeAsString = e.target?.value;
      onEdit({
        ...e,
        target: { ...e.target, value: visualizationTypeMap[typeAsString] },
      });
    },
    [onEdit]
  );

  return (
    <>
      <div className="eli-form-control-group d-flex">
        <label
          className="eli-form-control"
          htmlFor={`${data.id}-dataSourceUrl`}
        >
          Data Source URL
        </label>
        <input
          id={`${data.id}-dataSourceUrl`}
          type="url"
          className="eli-form-control"
          onChange={onEdit}
          data-name="dataSourceUrl"
          value={data.dataSourceUrl || ""}
        />
      </div>
      <div className="eli-form-control-group d-flex">
        <label className="eli-form-control" htmlFor={`${data.id}-width`}>
          Width (% of screen)
        </label>
        <div className="eli-form-control d-flex">
          <input
            id={`${data.id}-width`}
            type="range"
            max={100}
            min={0}
            className="eli-form-control"
            onChange={onEdit}
            data-name="width"
            value={data.width || 50}
          />
          <input
            id={`${data.id}-width-number`}
            type="number"
            className="eli-form-control"
            data-name="width"
            min={0}
            max={100}
            value={data.width || 50}
            onChange={onEdit}
          />
        </div>
      </div>
      <div className="eli-form-control-group d-flex">
        <label className="eli-form-control" htmlFor={`${data.id}-height`}>
          Height (% of screen)
        </label>
        <div className="eli-form-control d-flex">
          <input
            id={`${data.id}-height`}
            type="range"
            max={100}
            min={0}
            className="eli-form-control"
            onChange={onEdit}
            data-name="height"
            value={data.height || 50}
          />
          <input
            id={`${data.id}-height-number`}
            type="number"
            className="eli-form-control"
            data-name="height"
            min={0}
            max={100}
            value={data.height || 50}
            onChange={onEdit}
          />
        </div>
      </div>
      <div className="eli-form-control-group d-flex">
        <label className="eli-form-control" htmlFor={`${data.id}-type`}>
          Visualization Type
        </label>
        <select
          id={`${data.id}-type`}
          className="eli-form-control"
          data-name="type"
          onChange={changeType}
        >
          {visualizationTypeList.map((visualType) => (
            <option
              value={visualType}
              selected={data.type?.name === visualType}
            >
              {visualType}
            </option>
          ))}
        </select>
      </div>
      {data.type?.config.map((prop) => (
        <ConfigInput
          config={prop}
          id={`${data.id}-config-${prop.name}`}
          onEdit={updateConfigFields}
        />
      ))}
    </>
  );
}

function ConfigInput({
  config,
  id,
  onEdit,
}: {
  config: VisualizationProp;
  id: string;
  onEdit: EventHandler<any>;
}) {
  const addNewDataset = useCallback(
    (e) => {
      e.preventDefault();
      const datasets = [
        ...(config.options.datasets || []),
        config.options.defaultDataset,
      ];
      onEdit({
        ...e,
        target: {
          ...e.target,
          value: { ...config, options: { ...config.options, datasets } },
        },
      });
    },
    [config, onEdit]
  );

  switch (config.inputType) {
    case HTMLInputType.AddMoreButton:
      return (
        <div className="eli-form-control-group d-flex">
          <button
            id={id}
            className="eli-form-control"
            data-name={config.name}
            onClick={addNewDataset}
          ></button>
        </div>
      );

    case HTMLInputType.Checkbox:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="checkbox"
            className="eli-form-control"
            checked={config.value}
            data-name={config.name}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Color:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <div className="eli-form-control d-flex">
            <input
              id={id}
              type="text"
              className="eli-form-control"
              data-name={config.name}
              value={config.value}
              onChange={onEdit}
            />
            <input
              id={`${id}-color`}
              type="color"
              className="eli-form-control"
              data-name={config.name}
              value={config.value}
              onChange={onEdit}
            />
          </div>
        </div>
      );

    case HTMLInputType.Date:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="date"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Email:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="email"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Month:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="month"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Number:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="number"
            className="eli-form-control"
            min={config.options.min}
            max={config.options.max}
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Range:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <div className="eli-form-control d-flex">
            <input
              id={id}
              type="range"
              className="eli-form-control"
              data-name={config.name}
              min={config.options.min}
              max={config.options.max}
              value={config.value}
              onChange={onEdit}
            />
            <input
              id={`${id}-number`}
              type="number"
              className="eli-form-control"
              data-name={config.name}
              min={config.options.min}
              max={config.options.max}
              value={config.value}
              onChange={onEdit}
            />
          </div>
        </div>
      );

    case HTMLInputType.Select:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <select
            className="eli-form-control"
            data-name={config.name}
            onChange={onEdit}
          >
            {config.options.options?.map((option: any) => (
              <option value={option} selected={config.value === option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case HTMLInputType.Text:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="text"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.TextArea:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <textarea
            id={id}
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Time:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="time"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Url:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="url"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    case HTMLInputType.Week:
      return (
        <div className="eli-form-control-group d-flex">
          <label className="eli-form-control" htmlFor={id}>
            {config.label}
          </label>
          <input
            id={id}
            type="week"
            className="eli-form-control"
            data-name={config.name}
            value={config.value}
            onChange={onEdit}
          />
        </div>
      );

    default:
      throw new Error(`input type for ${config.name} config not supported`);
  }
}
