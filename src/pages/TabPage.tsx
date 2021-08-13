// Page that shows any tab
import React, { useMemo } from "react";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserAppConfigContext } from "../context";
import editIconWhite from "../assets/images/edit_white.svg";
import VisualizationUiCard from "../components/VisualizationUiCard";

export default function TabPage() {
  // @ts-ignore
  const { id } = useParams();
  const appConfig = useContext(UserAppConfigContext);

  const tab = useMemo(() => appConfig.tabs[id], [appConfig, id]);

  return (
    <div className="container-fluid">
      <section className="page-banner d-flex justify-space-between">
        <div className="page-heading">
          <p className="subtitle">{tab.title}</p>
          <h4 className="title">Visualizations</h4>
        </div>
        <Link className="btn btn-round" to={`/control-panel/tabs/${tab.id}`}>
          <img src={editIconWhite} alt="Edit" />
        </Link>
      </section>
      <section className="scrollview d-flex flex-wrap">
        {tab.order.map((id, index) => (
          <VisualizationUiCard
            visualization={tab.visualizations[id]}
            key={id}
          />
        ))}
      </section>
    </div>
  );
}
