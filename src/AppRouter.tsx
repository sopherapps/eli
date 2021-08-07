/**
 * Module containing the main router of the app
 */
import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tabbar from "./components/Tabbar";
import Topbar from "./components/Topbar";
import { Theme, ThemeContext } from "./context";
import ControlPanel from "./pages/ControlPanel";
import Home from "./pages/Home";
import TabPage from "./pages/TabPage";

export default function AppRouter() {
  const theme = useContext(ThemeContext);
  const themeClassName = theme === Theme.Dark ? "dark" : "light";

  return (
    <div className={`app eli-h-100 ${themeClassName}`}>
      <Router>
        <Topbar />
        <main className="fluid-container eli-h-100 eli-py-4">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/tabs/:id">
              <TabPage />
            </Route>
            <Route path="/control-panel">
              <ControlPanel />
            </Route>
          </Switch>
        </main>
        <Tabbar />
      </Router>
    </div>
  );
}
