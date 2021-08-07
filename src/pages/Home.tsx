// Page that shows the default empty page
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserAppConfigContext } from "../context";

export default function Home() {
  const appConfig = useContext(UserAppConfigContext);
  if (appConfig.tabOrder.length > 0) {
    return (
      <Redirect
        to={{
          pathname: `/tabs/${appConfig.tabs[appConfig.tabOrder[0]].id}`,
        }}
      />
    );
  }

  return (
    <div className="d-flex justify-center align-center full-height">
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
