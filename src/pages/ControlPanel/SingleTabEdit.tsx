// Page for the editing of a single tab, by adding, editing, or deleting given visualizations
import React, { useContext, useMemo } from "react";
import { UserAppConfigContext } from "../../context";
import { TableType, Visualization } from "../../data/models";
import backArrow from "../../assets/images/arrow_back_white.svg";
import plusIconWhite from "../../assets/images/add_white.svg";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import VisualizationEditCard from "../../components/VisualizationEditCard";
import { useCallback } from "react";

export default function SingleTabEdit() {
  // @ts-ignore
  const { id } = useParams();
  const appConfig = useContext(UserAppConfigContext);
  const tab = useMemo(() => appConfig.tabs[id], [id, appConfig]);
  const { path } = useRouteMatch();

  const createVisualization = useCallback(() => {
    const newVisual: Visualization = {
      id: `${new Date().getTime()}`,
      title: "New Visualization",
      dataSourceUrl: "",
      width: 50,
      height: 50,
      type: TableType,
    };

    appConfig.updateTab(tab.id, {
      ...tab,
      visualizations: { ...tab.visualizations, [newVisual.id]: newVisual },
      order: [...tab.order, newVisual.id],
    });
  }, [appConfig, tab]);

  if (!tab) {
    return <Redirect to={{ pathname: "/not-found" }} />;
  }

  return (
    <div className="container">
      <section className="page-banner d-flex justify-space-between">
        <div className="page-heading">
          <Link className="btn btn-round" to={`${path}/tabs/${tab.id}`}>
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
        {tab.order.map((id) => (
          <VisualizationEditCard
            visualization={tab.visualizations[id]}
            key={id}
          />
        ))}
      </section>
    </div>
  );
}
