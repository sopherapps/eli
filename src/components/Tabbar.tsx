// Component to show the footer
import React, { useState } from "react";
import { Tab } from "../data/models";
import leftArrowWhite from "../assets/images/arrow_left_white.svg";
import rightArrowWhite from "../assets/images/arrow_right_white.svg";
import { Link, useRouteMatch } from "react-router-dom";
import { useCallback } from "react";
import { useMemo } from "react";

export default function Tabbar(props: { tabs: Tab[] }) {
  const tabs = useMemo(() => props.tabs || [], [props]);
  // @ts-ignore
  const activeTitle = useRouteMatch("/tabs/:title")?.params?.title;
  const [firstTabIndex, setFirstTabIndex] = useState(0);

  const slideLeft = useCallback(() => {
    setFirstTabIndex(Math.max(0, firstTabIndex - 1));
  }, [firstTabIndex]);

  const slideRight = useCallback(() => {
    setFirstTabIndex(Math.min(tabs.length - 1, firstTabIndex + 1));
  }, [firstTabIndex, tabs]);

  return (
    <footer className="tabbar">
      <div>
        <button
          className="absolute-left absolute-bottom btn tab-control"
          onClick={slideLeft}
        >
          <img src={leftArrowWhite} alt="left" />
        </button>
        <div className="tab-menu">
          {tabs.slice(firstTabIndex).map((tab) => (
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
        <button
          className="absolute-right absolute-bottom btn tab-control"
          onClick={slideRight}
        >
          <img src={rightArrowWhite} alt="right" />
        </button>
      </div>
    </footer>
  );
}
