/**
 * Module containing the Button for adding more, e.g. add more configuration
 */

import { useCallback } from "react";
import { AddMoreConfigsProp, VisualizationProp } from "../../../data/types";

export default function AddMoreConfigButton({
  updateConfigSet,
  btnConfig,
}: {
  updateConfigSet: (newConfigs: {
    configs: VisualizationProp[];
    id: string;
  }) => void;
  btnConfig?: AddMoreConfigsProp;
}) {
  const addNewConfigs = useCallback(
    (e) => {
      e.preventDefault();
      const output = btnConfig?.datasetConfigGenerator(new Date());
      output && updateConfigSet(output);
    },
    [btnConfig, updateConfigSet]
  );

  return (
    <div className="eli-form-control-group d-flex justify-end">
      <button className="btn form-btn" onClick={addNewConfigs}>
        {btnConfig?.label || "Unexpected Error"}
      </button>
    </div>
  );
}
