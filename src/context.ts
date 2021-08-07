import React from "react";
import { UserAppConfig, Tab } from "./data/models";

export enum Theme {
  Dark,
  Light,
}

const defaultUserAppConfig: UserAppConfig = {
  tabs: {},
  createTab: () => ({ title: "" }),
  updateTab: (title: string, tab: Tab) => tab,
  deleteTab: (title: string) => {},
};

export const ThemeContext = React.createContext(Theme.Dark); // other possibility is light
export const UserAppConfigContext = React.createContext(defaultUserAppConfig);
