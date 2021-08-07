// Component to show the card for editting a tab
import React, { useContext } from "react";
import { Tab, Visualization } from "../data/models";

import whiteCloseIcon from "../assets/images/close_white.svg";
import whiteEditIcon from "../assets/images/edit_white.svg";

import whiteTextIcon from "../assets/images/text_snippet_white.svg";
import whiteListIcon from "../assets/images/list_white.svg";
import whiteBarChartIcon from "../assets/images/bar_chart_white.svg";
import whiteMixedChartIcon from "../assets/images/multiline_chart_white.svg";
import whitePieChartIcon from "../assets/images/pie_chart_white.svg";
import whiteDonutChartIcon from "../assets/images/donut_small_white.svg";
import whiteScatterChartIcon from "../assets/images/scatter_plot_white.svg";
import whiteLineChartIcon from "../assets/images/show_chart_white.svg";
import whiteStackedBarChartIcon from "../assets/images/stacked_bar_chart_white.svg";
import whiteStackedLineChartIcon from "../assets/images/stacked_line_chart_white.svg";
import whiteTableIcon from "../assets/images/table_chart_white.svg";
import { UserAppConfigContext } from "../context";
import { useCallback } from "react";

const visualizationTypeIcons: { [key: string]: string } = {
  text: whiteTextIcon,
  list: whiteListIcon,
  bar: whiteBarChartIcon,
  mixed: whiteMixedChartIcon,
  pie: whitePieChartIcon,
  donut: whiteDonutChartIcon,
  scatter: whiteScatterChartIcon,
  line: whiteLineChartIcon,
  "stacked-line": whiteStackedLineChartIcon,
  "stacked-bar": whiteStackedBarChartIcon,
  table: whiteTableIcon,
};

export default function TabEditCard({ tab }: { tab: Tab }) {
  const appConfig = useContext(UserAppConfigContext);

  const handleEdit = useCallback(
    (e) => {
      e.preventDefault();
      // @ts-ignore
      const property = e.target?.dataset?.name;
      // @ts-ignore
      const newValue = e.target?.value;
      appConfig.updateTab(tab.id, { ...tab, [property]: newValue });
    },
    [appConfig, tab]
  );

  return (
    <div className="card">
      <div className="card-header d-flex justify-space-between">
        <input
          type="text"
          className="editable-text"
          spellCheck={true}
          onChange={handleEdit}
          data-name="title"
          value={tab.title || ""}
        />
        <div className="card-control d-flex justify-space-between">
          <button className="btn">
            <img src={whiteEditIcon} alt="edit" />
          </button>
          <button className="btn">
            <img src={whiteCloseIcon} alt="close" />
          </button>
        </div>
      </div>
      <div className="card-body list-with-images">
        {tab.order?.map((id) => (
          <VisualizationItem data={tab.visualizations[id]} key={id} />
        ))}
      </div>
    </div>
  );
}

function VisualizationItem({ data }: { data: Visualization }) {
  return (
    <div className="list-item">
      <img src={visualizationTypeIcons[data.type]} alt={data.type} />
      <span>{data.title || ""}</span>
    </div>
  );
}
