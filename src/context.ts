import React from "react";
import { tabsKey, tabOrderKey } from "./config";
import { UserAppConfig, Tab } from "./data/types";

export enum Theme {
  Dark,
  Light,
}

export const ThemeContext = React.createContext(Theme.Dark); // other possibility is light
export const UserAppConfigContext = React.createContext(
  loadAppConfigFromStorage()
);

/**
 * Save the tabs to localStorage
 * @param tabs - the tabs and their configurations
 * @param tabOrder - the order in which the tabs are to be displayed
 */
export function saveAppConfigToStore(
  tabs: { [key: string]: Tab },
  tabOrder: string[]
) {
  const tabsAsJson = JSON.stringify(tabs);
  const tabOrderAsJson = JSON.stringify(tabOrder);
  localStorage.setItem(tabsKey, tabsAsJson);
  localStorage.setItem(tabOrderKey, tabOrderAsJson);
}

/**
 * Loads the tabs and the tabOrder from localStorage and returns them in an object
 * @returns {{tabs: [key:string]: Tab, tabOrder: string[]}}
 */
export function loadTabsAndTabOrderFromStorage(): {
  tabs: { [key: string]: Tab };
  tabOrder: string[];
} {
  const tabsAsJson = localStorage.getItem(tabsKey) || `{}`;
  const tabOrderAsJson = localStorage.getItem(tabOrderKey) || `[]`;

  return {
    tabs: JSON.parse(tabsAsJson),
    tabOrder: JSON.parse(tabOrderAsJson),
  };
}

/**
 * Loads the initial UserAppConfig from the localStorage
 * @returns {UserAppConfig}
 */
function loadAppConfigFromStorage(): UserAppConfig {
  return {
    ...loadTabsAndTabOrderFromStorage(),
    createTab: () => ({
      id: `${new Date().getTime()}`,
      title: "",
      visualizations: {},
      order: [],
    }),
    updateTab: (id: string, tab: Tab) => tab,
    deleteTab: (id: string) => {},
  };
}
