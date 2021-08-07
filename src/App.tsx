import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import { ThemeContext, Theme, UserAppConfigContext } from "./context";
import { Tab, UserAppConfig } from "./data/models";

function App() {
  const localStorageAppConfigKey = "eli:AppConfig";
  const tabList: { [key: string]: Tab } = {};
  const [tabs, setTabs] = useState(tabList);
  const appConfig: UserAppConfig = {
    tabs: tabs,
    createTab: useCallback(() => {
      // ensure no title duplicates
      let title = "New Tab";
      let newTabNumber = 1;

      while (tabs[title]) {
        title = `${title} (${newTabNumber})`;
        newTabNumber++;
      }

      const newTab: Tab = { title };
      setTabs({ ...tabs, title: newTab });
      return newTab;
    }, [tabs]),
    updateTab: (title: string, tab: Tab) => {
      const tabsCopy = { ...tabs };
      delete tabsCopy[title];
      setTabs({ ...tabsCopy, [tab.title]: tab });
      return tab;
    },
    deleteTab: (title: string) => {
      const tabsCopy = { ...tabs };
      delete tabsCopy[title];
      setTabs(tabsCopy);
    },
  };

  useEffect(() => {
    const tabsAsJson =
      localStorage.getItem(localStorageAppConfigKey) ||
      `{
        "hello 1": {"title": "hello 1"},
        "hello 2": {"title": "hello 2"},
        "hello 3": {"title": "hello 3"},
        "hello 4": {"title": "hello 4"},
        "hello 5": {"title": "hello 5"},
        "hi world hjfhajfuaoyfoaysua": {"title": "hi world hjfhajfuaoyfoaysua"},
        "foo bar hjgdahgdayditaiydtsa": {"title": "foo bar hjgdahgdayditaiydtsa"}
      }`;
    setTabs(JSON.parse(tabsAsJson));
  }, []);

  useEffect(() => {
    const tabsAsJson = JSON.stringify(tabs);
    localStorage.setItem(localStorageAppConfigKey, tabsAsJson);
  }, [tabs]);

  return (
    <ThemeContext.Provider value={Theme.Dark}>
      <UserAppConfigContext.Provider value={appConfig}>
        <AppRouter />
      </UserAppConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
