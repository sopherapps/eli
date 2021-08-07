import React from "react";
import { UserAppConfig, Tab } from "./data/models";

export enum Theme {
  Dark,
  Light,
}

const defaultUserAppConfig: UserAppConfig = {
  tabs: {},
  tabOrder: [],
  createTab: () => ({
    id: `${new Date().getTime()}`,
    title: "",
    visualizations: {},
    order: [],
  }),
  updateTab: (id: string, tab: Tab) => tab,
  deleteTab: (id: string) => {},
};

export const ThemeContext = React.createContext(Theme.Dark); // other possibility is light
export const UserAppConfigContext = React.createContext(defaultUserAppConfig);
