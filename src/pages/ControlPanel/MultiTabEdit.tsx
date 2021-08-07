// Page for adding, deleting or initializing the editting of tabs
import React, { useMemo } from "react";
import { useContext } from "react";
import plusIconDark from "../../assets/images/add_white.svg";
import TabEditCard from "../../components/TabEditCard";
import { UserAppConfigContext } from "../../context";

export default function MultiTabEdit() {
  const appConfig = useContext(UserAppConfigContext);
  const tabTitles = useMemo(
    () => Object.keys(appConfig.tabs).sort(),
    [appConfig.tabs]
  );

  return (
    <div className="container">
      <section className="page-banner d-flex justify-space-between">
        <div className="page-heading">
          <p className="subtitle">TABS</p>
          <h3 className="title">Control Panel</h3>
        </div>
        <button className="btn btn-round" onClick={appConfig.createTab}>
          <img src={plusIconDark} alt="Create New Tab" />
        </button>
      </section>
      <section className="scrollview">
        {tabTitles.map((title) => (
          <TabEditCard tab={appConfig.tabs[title]} key={title} />
        ))}
      </section>
    </div>
  );
}
