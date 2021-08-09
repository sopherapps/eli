/**
 * Module contains the models to store as configuration for a given user.
 * Ideally there might be an option to clear past configurations
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

export interface UserAppConfig {
  tabs: { [key: string]: Tab };
  tabOrder: string[];
  createTab: () => Tab;
  updateTab: (id: string, tab: Tab) => Tab;
  deleteTab: (id: string) => void;
}

export interface Tab {
  id: string;
  title: string;
  visualizations: { [key: string]: Visualization };
  order: string[];
}

export interface Visualization {
  id: string;
  title: string;
  dataSourceUrl: string;
  width: number;
  height: number;
  type: VisualizationType;
}

export interface VisualizationType {
  name: string;
  icon: string;
  config: VisualizationProp[];
}

export interface VisualizationProp {
  name: string;
  label: string;
  inputType: HTMLInputType;
  options: { [key: string]: any };
  value?: any;
}

// FIXME: I might need to create separte input components for each of these.
// These are got from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export enum HTMLInputType {
  Text,
  Number,
  Email,
  Url,
  TextArea,
  Checkbox,
  Range,
  Color,
  Date,
  Month,
  Time,
  Week,
  Select,
  AddMoreButton,
}

/* Visualization Types */

export const TableType: VisualizationType = {
  name: "table",
  icon: whiteTableIcon,
  config: [
    {
      name: "columnField",
      label: "column field",
      inputType: HTMLInputType.Text,
      options: {},
    },
    {
      name: "rowField",
      label: "row field",
      inputType: HTMLInputType.Text,
      options: {},
    },
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
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
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      options: {},
    },
    {
      name: "xField",
      label: "X-axis field",
      inputType: HTMLInputType.Text,
      options: {},
    },
    {
      name: "yField",
      label: "Y-axis field",
      inputType: HTMLInputType.Text,
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
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      options: {},
    },
    {
      name: "xField",
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      options: {},
    },
    {
      name: "yField",
      label: "y-axis field",
      inputType: HTMLInputType.Text,
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
    {
      name: "addDataset",
      label: "add dataset",
      inputType: HTMLInputType.AddMoreButton,
      options: {
        datasets: [],
        defaultDataset: [
          {
            name: "name",
            label: "name",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "label",
            label: "label",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "color",
            label: "color",
            inputType: HTMLInputType.Color,
            options: {},
          },
          {
            name: "xField",
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "yField",
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
        ],
      },
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
      options: {},
    },
    {
      name: "color",
      label: "color",
      inputType: HTMLInputType.Color,
      options: {},
    },
    {
      name: "xField",
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      options: {},
    },
    {
      name: "yField",
      label: "y-axis field",
      inputType: HTMLInputType.Text,
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
  config: [
    {
      name: "addDataset",
      label: "add dataset",
      inputType: HTMLInputType.AddMoreButton,
      options: {
        datasets: [],
        defaultDataset: [
          {
            name: "name",
            label: "name",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "label",
            label: "label",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "color",
            label: "color",
            inputType: HTMLInputType.Color,
            options: {},
          },
          {
            name: "xField",
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "yField",
            label: "y-axis field",
            inputType: HTMLInputType.Text,
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
      },
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
    {
      name: "addBarDataset",
      label: "add bar dataset",
      inputType: HTMLInputType.AddMoreButton,
      options: {
        datasets: [],
        defaultDataset: [
          {
            name: "name",
            label: "name",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "label",
            label: "label",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "color",
            label: "color",
            inputType: HTMLInputType.Color,
            options: {},
          },
          {
            name: "xField",
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "yField",
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
        ],
      },
    },
    {
      name: "addLineDataset",
      label: "add Line dataset",
      inputType: HTMLInputType.AddMoreButton,
      options: {
        datasets: [],
        defaultDataset: [
          {
            name: "name",
            label: "name",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "label",
            label: "label",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "color",
            label: "color",
            inputType: HTMLInputType.Color,
            options: {},
          },
          {
            name: "xField",
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            options: {},
          },
          {
            name: "yField",
            label: "y-axis field",
            inputType: HTMLInputType.Text,
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
      },
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
      options: {},
    },
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
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
      options: {},
    },
    {
      name: "valueField",
      label: "value field",
      inputType: HTMLInputType.Text,
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

export const visualizationTypeMap: { [key: string]: VisualizationType } = {
  [TableType.name]: TableType,
  [ScatterChartType.name]: ScatterChartType,
  [BarChartType.name]: BarChartType,
  [MultipleBarChartType.name]: MultipleBarChartType,
  [LineChartType.name]: LineChartType,
  [MultipleLineChartType.name]: MultipleLineChartType,
  [MixedChartType.name]: MixedChartType,
  [PieChartType.name]: PieChartType,
  [DonutChartType.name]: DonutChartType,
  [TextType.name]: TextType,
  [OrderedListType.name]: OrderedListType,
  [UnorderedListType.name]: UnorderedListType,
};

export const visualizationTypeList = Object.keys(visualizationTypeMap).sort();
