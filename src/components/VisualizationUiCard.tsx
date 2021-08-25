// Component to allow viewing a visualization
import React from "react";
import { Visualization } from "../data/types";
import VisualizationBody from "./Visual/Specific/VisualizationBody";

export default function VisualizationUiCard({
  visualization,
}: {
  visualization: Visualization;
}) {
  return (
    <div
      className="visual"
      data-testid="visualization-ui-card"
      style={{
        height: `${visualization.height}vh`,
        width: `${visualization.width}%`,
      }}
    >
      <div className="card-header">
        <h5 data-testid="visualization-heading">{visualization.title}</h5>
      </div>
      <div className="card">
        <div className="card-body list-with-images">
          <VisualizationBody visualization={visualization} />
        </div>
      </div>
    </div>
  );
}
