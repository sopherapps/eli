// Component to allow editing a visualization
import React, { useCallback } from "react";
import whiteArrowDownIcon from "../assets/images/arrow_downward_white.svg";
import whiteArrowUpIcon from "../assets/images/arrow_upward_white.svg";
import whiteCloseIcon from "../assets/images/close_white.svg";
import { validate } from "../data/errors";
import { Visualization } from "../data/types";
import VisualizationForm from "./Form/Specific/VisualizationForm";

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
      const prop = e.target?.dataset.name;
      const value = e.target?.value;
      const error = e.target?.validationMessage;
      const errors = validate(visualization);

      onEdit(visualization.id, {
        ...visualization,
        errors: { ...errors, [prop]: error },
        [prop]: value,
      });
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
          data-testid="title"
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
      <div className="card-body">
        <VisualizationForm data={visualization} onEdit={memoizedOnEdit} />
      </div>
    </div>
  );
}
