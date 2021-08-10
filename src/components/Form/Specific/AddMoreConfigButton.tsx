/**
 * Module containing the Button for adding more, e.g. add more configuration
 */

import { EventHandler, useCallback } from "react";
import { VisualizationProp } from "../../../data/types";

export default function AddMoreConfigButton({
  id,
  onEdit,
  config,
}: {
  id: string;
  onEdit: EventHandler<any>;
  config: VisualizationProp;
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
        preventDefault: () => e.preventDefault(),
        target: {
          ...e.target,
          checkValidity: () => e.target.checkValidity(),
          dataset: { name: config.name },
          value: { ...config, options: { ...config.options, datasets } },
        },
      });
    },
    [config, onEdit]
  );
  return (
    <div className="eli-form-control-group d-flex">
      <button
        id={id}
        className="btn form-btn"
        data-name={config.name}
        onClick={addNewDataset}
      >
        {config.label}
      </button>
    </div>
  );
}
