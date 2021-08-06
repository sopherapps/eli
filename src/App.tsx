import React, { useEffect } from "react";
import { useState } from "react";
import AppRouter from "./AppRouter";
import {
  ThemeContext,
  Theme,
  UserAppConfigContext,
  defaultUserAppConfig,
} from "./context";

function App() {
  const localStorageAppConfigKey = "eli:AppConfig";
  const [appConfig, changeAppConfig] = useState(defaultUserAppConfig);

  useEffect(() => {
    const appConfigAsJson =
      localStorage.getItem(localStorageAppConfigKey) ||
      '{"tabs":[{"title": "hello world"},{"title": "hi world hjfhajfuaoyfoaysua"},{"title": "foo bar hjgdahgdayditaiydtsa"}]}';
    changeAppConfig(JSON.parse(appConfigAsJson));
  }, []);

  useEffect(() => {
    const appConfigAsJson = JSON.stringify(appConfig);
    localStorage.setItem(localStorageAppConfigKey, appConfigAsJson);
  }, [appConfig]);

  return (
    <ThemeContext.Provider value={Theme.Dark}>
      <UserAppConfigContext.Provider value={appConfig}>
        <AppRouter />
      </UserAppConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
