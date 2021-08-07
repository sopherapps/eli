// Component to show the footer
import React, { useContext, useState } from "react";
import leftArrowWhite from "../assets/images/arrow_left_white.svg";
import rightArrowWhite from "../assets/images/arrow_right_white.svg";
import { Link, useRouteMatch } from "react-router-dom";
import { useCallback } from "react";
import { UserAppConfigContext } from "../context";

export default function Tabbar() {
  // @ts-ignore
  const activeId = useRouteMatch("/tabs/:id")?.params?.id;
  const [firstTabIndex, setFirstTabIndex] = useState(0);
  const appConfig = useContext(UserAppConfigContext);

  const slideRight = useCallback(() => {
    setFirstTabIndex(Math.max(0, firstTabIndex - 1));
  }, [firstTabIndex]);

  const slideLeft = useCallback(() => {
    setFirstTabIndex(
      Math.min(appConfig.tabOrder.length - 1, firstTabIndex + 1)
    );
  }, [firstTabIndex, appConfig.tabOrder]);

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
          {appConfig.tabOrder.slice(firstTabIndex).map((id) => (
            <Link
              key={id}
              to={`/tabs/${id}`}
              className={`tab-navitem ${activeId === id ? "active" : ""}`}
            >
              {appConfig.tabs[id]?.title || ""}
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
