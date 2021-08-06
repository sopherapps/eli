// Component to show the top bar
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import settingsIcon from "../assets/images/settings_white.svg";

export default function Topbar() {
  const controlPanelActiveClass = useRouteMatch("/control-panel")
    ? " active"
    : "";
  return (
    <header className="topbar">
      <div className="fluid-container d-flex justify-space-between align-center">
        <Link className="logo" to="/">
          Eli
        </Link>
        <Link
          to="/control-panel"
          className={`btn btn-round ${controlPanelActiveClass}`}
          role="button"
        >
          <img src={settingsIcon} alt="control panel" />
        </Link>
      </div>
    </header>
  );
}
