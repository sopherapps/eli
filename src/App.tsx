import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import { ThemeContext, Theme, UserAppConfigContext } from "./context";
import { Tab, UserAppConfig } from "./data/types";

function App() {
  const localStorageAppConfigKey = "eli:AppConfig";
  const tabsKey = `${localStorageAppConfigKey}:tabs`;
  const tabOrderKey = `${localStorageAppConfigKey}:tabOrder`;
  const mapOfTabs: { [key: string]: Tab } = {};
  const stringArray: string[] = [];

  const [tabs, setTabs] = useState(mapOfTabs);
  const [tabOrder, setTabOrder] = useState(stringArray);

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
    const tabsAsJson = localStorage.getItem(tabsKey) || `{}`;
    const tabOrderAsJson = localStorage.getItem(tabOrderKey) || `[]`;
    setTabs(JSON.parse(tabsAsJson));
    setTabOrder(JSON.parse(tabOrderAsJson));
  }, [tabsKey, tabOrderKey]);

  useEffect(() => {
    const tabsAsJson = JSON.stringify(tabs);
    const tabOrderAsJson = JSON.stringify(tabOrder);
    localStorage.setItem(tabsKey, tabsAsJson);
    localStorage.setItem(tabOrderKey, tabOrderAsJson);
  }, [tabs, tabOrder, tabOrderKey, tabsKey]);

  return (
    <ThemeContext.Provider value={Theme.Dark}>
      <UserAppConfigContext.Provider value={appConfig}>
        <AppRouter />
      </UserAppConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
