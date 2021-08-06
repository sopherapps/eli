// Component to show the footer
import React from "react";
import { Tab } from "../data/models";
import leftArrowWhite from "../assets/images/arrow_left_white.svg";
import rightArrowWhite from "../assets/images/arrow_right_white.svg";
import { Link, useRouteMatch } from "react-router-dom";

export default function Tabbar(props: { tabs: Tab[] }) {
  const tabs = props.tabs || [];
  // @ts-ignore
  const activeTitle = useRouteMatch("/tabs/:title")?.params?.title;

  return (
    <footer className="tabbar">
      <div>
        <button className="absolute-left absolute-bottom btn tab-control">
          <img src={leftArrowWhite} alt="left" />
        </button>
        <div className="tab-menu">
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              to={`/tabs/${tab.title}`}
              className={`tab-navitem ${
                activeTitle === tab.title ? "active" : ""
              }`}
            >
              {tab.title}
            </Link>
          ))}
        </div>
        <button className="absolute-right absolute-bottom btn tab-control">
          <img src={rightArrowWhite} alt="right" />
        </button>
      </div>
    </footer>
  );
}
