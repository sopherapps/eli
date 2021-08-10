import React, { useEffect, useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import {
  ThemeContext,
  Theme,
  UserAppConfigContext,
  saveAppConfigToStore,
  loadTabsAndTabOrderFromStorage,
} from "./context";
import { Tab, UserAppConfig } from "./data/types";

function App() {
  const storedData = useMemo(loadTabsAndTabOrderFromStorage, []);

  const [tabs, setTabs] = useState(storedData.tabs);
  const [tabOrder, setTabOrder] = useState(storedData.tabOrder);

  const appConfig: UserAppConfig = {
    tabs,
    tabOrder,
    createTab: useCallback(() => {
      // ensure no title duplicates
      const defaultTitle = "New Tab";
      let title = defaultTitle;
      let newTabNumber = 0;

      const availableTitles: { [key: string]: boolean } = {};
      for (let _id in tabs) {
        availableTitles[tabs[_id].title] = true;
      }

      while (availableTitles[title]) {
        newTabNumber++;
        title = `${defaultTitle} (${newTabNumber})`;
      }

      const id = `${new Date().getTime()}-${newTabNumber}`;

      const newTab: Tab = { id, title, visualizations: {}, order: [] };
      setTabs({ ...tabs, [id]: newTab });
      setTabOrder([id, ...tabOrder]);
      return newTab;
    }, [tabs, tabOrder]),
    updateTab: (id: string, tab: Tab) => {
      setTabs({ ...tabs, [tab.id]: tab });
      return tab;
    },
    deleteTab: (id: string) => {
      const tabsCopy = { ...tabs };
      delete tabsCopy[id];
      setTabs(tabsCopy);
      setTabOrder(tabOrder.filter((value) => value !== id));
    },
  };

  useEffect(() => {
    saveAppConfigToStore(tabs, tabOrder);
  }, [tabs, tabOrder]);

  return (
    <ThemeContext.Provider value={Theme.Dark}>
      <UserAppConfigContext.Provider value={appConfig}>
        <AppRouter />
      </UserAppConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
