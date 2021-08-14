/**
 * Module contains the configurations of the Visualization types available
 */

import whiteTextIcon from "../assets/images/text_snippet_white.svg";
import whiteListIcon from "../assets/images/list_white.svg";
import whiteBarChartIcon from "../assets/images/bar_chart_white.svg";
import whiteMixedChartIcon from "../assets/images/multiline_chart_white.svg";
import whitePieChartIcon from "../assets/images/pie_chart_white.svg";
import whiteDonutChartIcon from "../assets/images/donut_small_white.svg";
import whiteScatterChartIcon from "../assets/images/scatter_plot_white.svg";
import whiteLineChartIcon from "../assets/images/show_chart_white.svg";
import whiteNumberdListIcon from "../assets/images/format_list_numbered_white.svg";
import whiteStackedLineChartIcon from "../assets/images/stacked_line_chart_white.svg";
import whiteTableIcon from "../assets/images/table_chart_white.svg";
import whiteMultipleBarChartIcon from "../assets/images/addchart_white.svg";
import { VisualizationType, HTMLInputType } from "./types";

export const datasetConfigSeparator = "_%&*Yu_";

export const TableType: VisualizationType = {
  name: "table",
  icon: whiteTableIcon,
  config: [
    {
      name: "columnOrder",
      label: "column order (comma separated)",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
  ],
};

export const ScatterChartType: VisualizationType = {
  name: "scatter-chart",
  icon: whiteScatterChartIcon,
  config: [
    {
      name: "label",
      label: "label",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      required: true,
      options: {},
    },
    {
      name: "xField",
      label: "X-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "yField",
      label: "Y-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
  ],
};

export const BarChartType: VisualizationType = {
  name: "bar-chart",
  icon: whiteBarChartIcon,
  config: [
    {
      name: "label",
      label: "label",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      required: true,
      options: {},
    },
    {
      name: "xField",
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "yField",
      label: "y-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "chartStyle",
      label: "chart style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    {
      name: "orientation",
      label: "orientation",
      inputType: HTMLInputType.Select,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
  ],
};

export const MultipleBarChartType: VisualizationType = {
  name: "multiple-bar-chart",
  icon: whiteMultipleBarChartIcon,
  config: [
    {
      name: "chartStyle",
      label: "chart style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    {
      name: "orientation",
      label: "orientation",
      inputType: HTMLInputType.Select,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
  ],
  addMoreConfigsButtons: [
    {
      label: "add dataset",
      datasetConfigGenerator: (time: Date) => ({
        id: `${time.getTime()}-add-dt`,
        configs: [
          {
            name: `${time.getTime()}-add-dt${datasetConfigSeparator}name`,
            label: "name",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-dt${datasetConfigSeparator}label`,
            label: "label",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-dt${datasetConfigSeparator}color`,
            label: "color",
            inputType: HTMLInputType.Color,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-dt${datasetConfigSeparator}xField`,
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-dt${datasetConfigSeparator}yField`,
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
        ],
      }),
    },
  ],
};

export const LineChartType: VisualizationType = {
  name: "line-chart",
  icon: whiteLineChartIcon,
  config: [
    {
      name: "label",
      label: "label",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      required: true,
      options: {},
    },
    {
      name: "xField",
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "yField",
      label: "y-axis field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "chartStyle",
      label: "chart style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["dotted", "normal"],
        default: "normal",
      },
    },
    {
      name: "areaUnderTheLineColor",
      label: "color of area under line",
      inputType: HTMLInputType.Color,
      options: {},
    },
  ],
};

export const MultipleLineChartType: VisualizationType = {
  name: "multiple-line-chart",
  icon: whiteStackedLineChartIcon,
  config: [],
  addMoreConfigsButtons: [
    {
      label: "add dataset",
      datasetConfigGenerator: (time: Date) => ({
        id: `${time.getTime()}-add-ln-dt`,
        configs: [
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}name`,
            label: "name",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}label`,
            label: "label",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}color`,
            label: "color",
            inputType: HTMLInputType.Color,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}xField`,
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}yField`,
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}chartStyle`,
            label: "chart style",
            inputType: HTMLInputType.Select,
            options: {
              options: ["dotted", "normal"],
              default: "normal",
            },
          },
          {
            name: `${time.getTime()}-add-ln-dt${datasetConfigSeparator}areaUnderTheLineColor`,
            label: "color of area under line",
            inputType: HTMLInputType.Color,
            options: {},
          },
        ],
      }),
    },
  ],
};

export const MixedChartType: VisualizationType = {
  name: "mixed-chart",
  icon: whiteMixedChartIcon,
  config: [
    {
      name: "barChartStyle",
      label: "bar chart style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    {
      name: "orientation",
      label: "orientation",
      inputType: HTMLInputType.Select,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
  ],
  addMoreConfigsButtons: [
    {
      label: "add bar dataset",
      datasetConfigGenerator: (time: Date) => ({
        id: `${time.getTime()}-add-bar-dt`,
        configs: [
          {
            name: `${time.getTime()}-add-bar-dt${datasetConfigSeparator}name`,
            label: "name",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-bar-dt${datasetConfigSeparator}label`,
            label: "label",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-bar-dt${datasetConfigSeparator}color`,
            label: "color",
            inputType: HTMLInputType.Color,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-bar-dt${datasetConfigSeparator}xField`,
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-bar-dt${datasetConfigSeparator}yField`,
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
        ],
      }),
    },
    {
      label: "add line dataset",
      datasetConfigGenerator: (time: Date) => ({
        id: `${time.getTime()}-add-line-dt`,
        configs: [
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}name`,
            label: "name",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}label`,
            label: "label",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}color`,
            label: "color",
            inputType: HTMLInputType.Color,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}xField`,
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}yField`,
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            required: true,
            options: {},
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}chartStyle`,
            label: "chart style",
            inputType: HTMLInputType.Select,
            options: {
              options: ["dotted", "normal"],
              default: "normal",
            },
          },
          {
            name: `${time.getTime()}-add-line-dt${datasetConfigSeparator}areaUnderTheLineColor`,
            label: "color of area under line",
            inputType: HTMLInputType.Color,
            options: {},
          },
        ],
      }),
    },
  ],
};

export const PieChartType: VisualizationType = {
  name: "pie-chart",
  icon: whitePieChartIcon,
  config: [
    {
      name: "labelField",
      label: "label field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
  ],
};

export const DonutChartType: VisualizationType = {
  name: "donut-chart",
  icon: whiteDonutChartIcon,
  config: [
    {
      name: "labelField",
      label: "label field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
  ],
};

export const UnorderedListType: VisualizationType = {
  name: "unordered-list",
  icon: whiteListIcon,
  config: [
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "style",
      label: "style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["circle", "square"],
      },
    },
  ],
};

export const OrderedListType: VisualizationType = {
  name: "ordered-list",
  icon: whiteNumberdListIcon,
  config: [
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "style",
      label: "style",
      inputType: HTMLInputType.Select,
      options: {
        options: ["upper-roman", "lower-roman", "upper-alpha", "lower-alpha"],
      },
    },
  ],
};

export const TextType: VisualizationType = {
  name: "text",
  icon: whiteTextIcon,
  config: [
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
      required: true,
      options: {},
    },
    {
      name: "fontSize",
      label: "font size",
      inputType: HTMLInputType.Range,
      options: {
        min: 8,
        max: 600,
        default: 16,
      },
    },
    {
      name: "bold",
      label: "bold",
      inputType: HTMLInputType.Checkbox,
      options: {
        default: false,
      },
    },
    {
      name: "italic",
      label: "italic",
      inputType: HTMLInputType.Checkbox,
      options: {
        default: false,
      },
    },
    {
      name: "alignment",
      label: "alignment",
      inputType: HTMLInputType.Select,
      options: {
        default: "left",
        options: ["left", "center", "right"],
      },
    },
  ],
};
