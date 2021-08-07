// Component to show the card for editting a tab
import React, { useContext } from "react";
import { Tab, Visualization } from "../data/models";

import whiteCloseIcon from "../assets/images/close_white.svg";
import whiteEditIcon from "../assets/images/edit_white.svg";

import { UserAppConfigContext } from "../context";
import { useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function TabEditCard({ tab }: { tab: Tab }) {
  const appConfig = useContext(UserAppConfigContext);
  const { path } = useRouteMatch();

  const handleEdit = useCallback(
    (e) => {
      e.preventDefault();
      // @ts-ignore
      const property = e.target?.dataset?.name;
      // @ts-ignore
      const newValue = e.target?.value;
      appConfig.updateTab(tab.id, { ...tab, [property]: newValue });
    },
    [appConfig, tab]
  );

  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      appConfig.deleteTab(tab.id);
    },
    [appConfig, tab]
  );

  return (
    <div className="card">
      <div className="card-header d-flex justify-space-between">
        <input
          type="text"
          className="editable-text"
          spellCheck={true}
          onChange={handleEdit}
          data-name="title"
          value={tab.title || ""}
        />
        <div className="card-control d-flex justify-space-between">
          <Link className="btn" to={`${path}/tabs/${tab.id}`}>
            <img src={whiteEditIcon} alt="edit" />
          </Link>
          <button className="btn">
            <img src={whiteCloseIcon} alt="close" onClick={handleDelete} />
          </button>
        </div>
      </div>
      <div className="card-body list-with-images">
        {tab.order?.map((id) => (
          <VisualizationItem data={tab.visualizations[id]} key={id} />
        ))}
      </div>
    </div>
  );
}

function VisualizationItem({ data }: { data: Visualization }) {
  return (
    <div className="list-item">
      <img src={data.type.icon} alt={data.type.name} />
      <span>{data.title || ""}</span>
    </div>
  );
}
