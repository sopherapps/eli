// Page for adding, deleting or initializing the editting of tabs
import React, { useContext } from "react";
import plusIconDark from "../../assets/images/add_white.svg";
import TabEditCard from "../../components/TabEditCard";
import { UserAppConfigContext } from "../../context";

export default function MultiTabEdit() {
  const appConfig = useContext(UserAppConfigContext);

  return (
    <div className="container">
      <section className="page-banner d-flex justify-space-between">
        <div className="page-heading">
          <p className="subtitle">TABS</p>
          <h4 className="title">Control Panel</h4>
        </div>
        <button className="btn btn-round" onClick={appConfig.createTab}>
          <img src={plusIconDark} alt="Create New Tab" />
        </button>
      </section>
      <section className="scrollview">
        {appConfig.tabOrder.map((id) => (
          <TabEditCard tab={appConfig.tabs[id]} key={id} />
        ))}
      </section>
    </div>
  );
}
