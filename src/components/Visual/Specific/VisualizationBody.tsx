/**
 * Module containing the component that conditionaly renders a given visualization
 */

import { Visualization } from "../../../data/types";

export default function VisualizationBody({
  visualization,
}: {
  visualization: Visualization;
}) {
  return <div>{visualization.title}</div>;
}
