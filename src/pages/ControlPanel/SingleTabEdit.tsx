// Page for the editing of a single tab, by adding, editing, or deleting given visualizations
import React, { useContext, useMemo } from "react";
import { UserAppConfigContext } from "../../context";
import backArrow from "../../assets/images/arrow_back_white.svg";
import plusIconWhite from "../../assets/images/add_white.svg";
import { Link, Redirect, useParams } from "react-router-dom";
import VisualizationEditCard from "../../components/VisualizationEditCard";
import { useCallback } from "react";
import { Visualization } from "../../data/types";
import { TableType } from "../../data/visualization-types";
import { validate } from "../../data/errors";

export default function SingleTabEdit() {
  // @ts-ignore
  const { id } = useParams();
  const appConfig = useContext(UserAppConfigContext);
  const tab = useMemo(() => appConfig.tabs[id], [id, appConfig]);

  const createVisualization = useCallback(() => {
    const newVisual: Visualization = {
      id: `${new Date().getTime()}`,
      title: "New Visualization",
      dataSourceUrl: "",
      width: 50,
      height: 50,
      type: TableType,
      errors: {},
      orderBy: "",
      shouldAppendNewData: true,
    };

    newVisual.errors = validate(newVisual);

    appConfig.updateTab(tab.id, {
      ...tab,
      visualizations: { ...tab.visualizations, [newVisual.id]: newVisual },
      order: [...tab.order, newVisual.id],
    });
  }, [appConfig, tab]);

  const updateVisualization = useCallback(
    (id: string, newVisual: Visualization) => {
      appConfig.updateTab(tab.id, {
        ...tab,
        visualizations: { ...tab.visualizations, [id]: newVisual },
      });
    },
    [appConfig, tab]
  );

  const deleteVisualization = useCallback(
    (id: string) => {
      const { visualizations } = tab;
      delete visualizations[id];

      appConfig.updateTab(tab.id, {
        ...tab,
        visualizations,
        order: tab.order.filter((value) => value !== id),
      });
    },
    [appConfig, tab]
  );

  const shiftVisualizationUp = useCallback(
    (id: string) => {
      const oldIndex = tab.order.indexOf(id);
      const newIndex = oldIndex - 1;

      if (oldIndex > 0) {
        appConfig.updateTab(tab.id, {
          ...tab,
          order: swapValues(tab.order, oldIndex, newIndex),
        });
      }
    },
    [appConfig, tab]
  );

  const shiftVisualizationDown = useCallback(
    (id: string) => {
      const oldIndex = tab.order.indexOf(id);
      const newIndex = oldIndex + 1;
      const lastIndex = tab.order.length - 1;

      if (oldIndex >= 0 && oldIndex < lastIndex) {
        appConfig.updateTab(tab.id, {
          ...tab,
          order: swapValues(tab.order, oldIndex, newIndex),
        });
      }
    },
    [appConfig, tab]
  );

  if (!tab) {
    return <Redirect to={{ pathname: "/not-found" }} />;
  }

  return (
    <div className="container">
      <section className="page-banner d-flex justify-space-between">
        <div className="page-heading d-flex">
          <Link className="btn btn-round" to="/control-panel">
            <img src={backArrow} alt="back to control panel" />
          </Link>
          <div>
            <p className="subtitle">TAB: {tab.title}</p>
            <h4 className="title">Control Panel</h4>
          </div>
        </div>
        <button className="btn btn-round" onClick={createVisualization}>
          <img src={plusIconWhite} alt="Create New Visualization" />
        </button>
      </section>
      <section className="scrollview">
        {tab.order.map((id, index) => (
          <VisualizationEditCard
            visualization={tab.visualizations[id]}
            onEdit={updateVisualization}
            onDelete={deleteVisualization}
            onShiftUp={shiftVisualizationUp}
            onShiftDown={shiftVisualizationDown}
            allowUpShift={index !== 0}
            allowDownShift={index < tab.order.length - 1}
            key={id}
          />
        ))}
      </section>
    </div>
  );
}

/**
 * Swaps the values at the given indices of the data array and returns a new array
 * @param data - the data array whose values are to be swapped
 * @param index1 - the first index
 * @param index2 - the other index
 * @returns {any[]}
 */
function swapValues(data: any[], index1: number, index2: number): any[] {
  const dataCopy = [...data];
  const index1Value = dataCopy[index1];
  const index2Value = dataCopy[index2];
  dataCopy[index1] = index2Value;
  dataCopy[index2] = index1Value;
  return dataCopy;
}
