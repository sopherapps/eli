import React, { useEffect } from "react";
import { useState } from "react";
import { UserAppConfig } from "./data/models";
import AppRouter from "./AppRouter";

enum Theme {
  Dark = 1,
  Light,
}
const defaultUserAppConfig: UserAppConfig = { tabs: [] };

const ThemeContext = React.createContext(Theme.Dark); // other possibility is light
const UserAppConfigContext = React.createContext(defaultUserAppConfig);

function App() {
  const localStorageAppConfigKey = "eli:AppConfig";
  const [appConfig, changeAppConfig] = useState(defaultUserAppConfig);

  useEffect(() => {
    const appConfigAsJson =
      localStorage.getItem(localStorageAppConfigKey) || '{"tabs":[]}';
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
