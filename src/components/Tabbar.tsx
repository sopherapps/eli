// Component to show the footer
import React, { useState } from "react";
import leftArrowWhite from "../assets/images/arrow_left_white.svg";
import rightArrowWhite from "../assets/images/arrow_right_white.svg";
import { Link, useRouteMatch } from "react-router-dom";
import { useCallback } from "react";
import { useMemo } from "react";

export default function Tabbar(props: { tabTitles: string[] }) {
  const tabTitles = useMemo(() => props.tabTitles || [], [props]);
  // @ts-ignore
  const activeTitle = useRouteMatch("/tabs/:title")?.params?.title;
  const [firstTabIndex, setFirstTabIndex] = useState(0);

  const slideRight = useCallback(() => {
    setFirstTabIndex(Math.max(0, firstTabIndex - 1));
  }, [firstTabIndex]);

  const slideLeft = useCallback(() => {
    setFirstTabIndex(Math.min(tabTitles.length - 1, firstTabIndex + 1));
  }, [firstTabIndex, tabTitles]);

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
          {tabTitles.slice(firstTabIndex).map((title) => (
            <Link
              key={title}
              to={`/tabs/${title}`}
              className={`tab-navitem ${activeTitle === title ? "active" : ""}`}
            >
              {title}
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
