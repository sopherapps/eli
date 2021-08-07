// Page that shows the default empty page
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserAppConfigContext } from "../context";

export default function Home() {
  const appConfig = useContext(UserAppConfigContext);
  const tabTitles = Object.keys(appConfig.tabs).sort();
  if (tabTitles.length > 0) {
    return (
      <Redirect
        to={{ pathname: `/tabs/${appConfig.tabs[tabTitles[0]].title}` }}
      />
    );
  }

  return (
    <div className="d-flex justify-center align-center h-100">
      <div className="cta mt-neg-4">
        <h2 className="logo">Eli</h2>
        <p>Create Your First Visualization</p>
        <Link className="btn" to="/control-panel">
          Go to Control Panel
        </Link>
      </div>
    </div>
  );
}
