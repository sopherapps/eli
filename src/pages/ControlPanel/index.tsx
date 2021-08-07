/**
 * Module containing the Control Panel and its router
 */
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MultiTabEdit from "./MultiTabEdit";
import SingleTabEdit from "./SingleTabEdit";

export default function ControlPanel() {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <MultiTabEdit />
      </Route>
      <Route path={`${path}/tabs/:title`}>
        <SingleTabEdit />
      </Route>
    </Switch>
  );
}
