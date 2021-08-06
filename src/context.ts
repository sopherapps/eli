import React from "react";
import { UserAppConfig } from "./data/models";

export enum Theme {
  Dark,
  Light,
}

export const defaultUserAppConfig: UserAppConfig = { tabs: [] };

export const ThemeContext = React.createContext(Theme.Dark); // other possibility is light
export const UserAppConfigContext = React.createContext(defaultUserAppConfig);
