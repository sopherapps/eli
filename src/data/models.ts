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
import whiteStackedBarChartIcon from "../assets/images/stacked_bar_chart_white.svg";
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
  config: { [key: string]: VisualizationProp };
}

export interface VisualizationProp {
  label: string;
  inputType: HTMLInputType;
  orderPosition: number;
  options: { [key: string]: any };
}

// FIXME: I might need to create separte input components for each of these.
// These are got from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export enum HTMLInputType {
  Text,
  Number,
  Email,
  Url,
  TextArea,
  Radio,
  Checkbox,
  Range,
  Color,
  Date,
  Month,
  Time,
  Week,
  Select,
  Button,
}

/* Visualization Types */

export const TableType: VisualizationType = {
  name: "table",
  icon: whiteTableIcon,
  config: {
    columnField: {
      label: "column field",
      inputType: HTMLInputType.Text,
      orderPosition: 1,
      options: {},
    },
    rowField: {
      label: "row field",
      inputType: HTMLInputType.Text,
      orderPosition: 2,
      options: {},
    },
    valueField: {
      label: "value field",
      inputType: HTMLInputType.Text,
      orderPosition: 3,
      options: {},
    },
  },
};

export const ScatterChartType: VisualizationType = {
  name: "scatter-chart",
  icon: whiteScatterChartIcon,
  config: {
    label: {
      label: "label",
      inputType: HTMLInputType.Text,
      orderPosition: 1,
      options: {},
    },
    color: {
      label: "color",
      inputType: HTMLInputType.Color,
      orderPosition: 2,
      options: {},
    },
    xField: {
      label: "X-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 3,
      options: {},
    },
    yField: {
      label: "Y-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 4,
      options: {},
    },
  },
};

export const BarChartType: VisualizationType = {
  name: "bar-chart",
  icon: whiteBarChartIcon,
  config: {
    label: {
      label: "label",
      inputType: HTMLInputType.Text,
      orderPosition: 1,
      options: {},
    },
    color: {
      label: "color",
      inputType: HTMLInputType.Color,
      orderPosition: 2,
      options: {},
    },
    xField: {
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 3,
      options: {},
    },
    yField: {
      label: "y-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 4,
      options: {},
    },
    chartStyle: {
      label: "chart style",
      inputType: HTMLInputType.Select,
      orderPosition: 5,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    orientation: {
      label: "orientation",
      inputType: HTMLInputType.Select,
      orderPosition: 6,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
  },
};

export const MultipleBarChartType: VisualizationType = {
  name: "multiple-bar-chart",
  icon: whiteMultipleBarChartIcon,
  config: {
    chartStyle: {
      label: "chart style",
      inputType: HTMLInputType.Select,
      orderPosition: 1,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    orientation: {
      label: "orientation",
      inputType: HTMLInputType.Select,
      orderPosition: 2,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
    addDataset: {
      label: "add dataset",
      inputType: HTMLInputType.Button,
      orderPosition: 3,
      options: {
        datasets: [],
        defaultDataset: {
          name: {
            label: "name",
            inputType: HTMLInputType.Text,
            orderPosition: 1,
            options: {},
          },
          label: {
            label: "label",
            inputType: HTMLInputType.Text,
            orderPosition: 2,
            options: {},
          },
          color: {
            label: "color",
            inputType: HTMLInputType.Color,
            orderPosition: 3,
            options: {},
          },
          xField: {
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 4,
            options: {},
          },
          yField: {
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 5,
            options: {},
          },
        },
      },
    },
  },
};

export const LineChartType: VisualizationType = {
  name: "line-chart",
  icon: whiteLineChartIcon,
  config: {
    label: {
      label: "label",
      inputType: HTMLInputType.Text,
      orderPosition: 1,
      options: {},
    },
    color: {
      label: "color",
      inputType: HTMLInputType.Color,
      orderPosition: 2,
      options: {},
    },
    xField: {
      label: "x-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 3,
      options: {},
    },
    yField: {
      label: "y-axis field",
      inputType: HTMLInputType.Text,
      orderPosition: 4,
      options: {},
    },
    chartStyle: {
      label: "chart style",
      inputType: HTMLInputType.Select,
      orderPosition: 5,
      options: {
        options: ["dotted", "normal"],
        default: "normal",
      },
    },
    areaUnderTheLineColor: {
      label: "color of area under line",
      inputType: HTMLInputType.Color,
      orderPosition: 6,
      options: {},
    },
  },
};

export const MultipleLineChartType: VisualizationType = {
  name: "multiple-line-chart",
  icon: whiteStackedLineChartIcon,
  config: {
    addDataset: {
      label: "add dataset",
      inputType: HTMLInputType.Button,
      orderPosition: 3,
      options: {
        datasets: [],
        defaultDataset: {
          name: {
            label: "name",
            inputType: HTMLInputType.Text,
            orderPosition: 1,
            options: {},
          },
          label: {
            label: "label",
            inputType: HTMLInputType.Text,
            orderPosition: 2,
            options: {},
          },
          color: {
            label: "color",
            inputType: HTMLInputType.Color,
            orderPosition: 3,
            options: {},
          },
          xField: {
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 4,
            options: {},
          },
          yField: {
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 5,
            options: {},
          },
          chartStyle: {
            label: "chart style",
            inputType: HTMLInputType.Select,
            orderPosition: 6,
            options: {
              options: ["dotted", "normal"],
              default: "normal",
            },
          },
          areaUnderTheLineColor: {
            label: "color of area under line",
            inputType: HTMLInputType.Color,
            orderPosition: 7,
            options: {},
          },
        },
      },
    },
  },
};

export const MixedChartType: VisualizationType = {
  name: "mixed-chart",
  icon: whiteMixedChartIcon,
  config: {
    barChartStyle: {
      label: "bar chart style",
      inputType: HTMLInputType.Select,
      orderPosition: 1,
      options: {
        options: ["stacked", "normal"],
        default: "normal",
      },
    },
    orientation: {
      label: "orientation",
      inputType: HTMLInputType.Select,
      orderPosition: 2,
      options: {
        options: ["horizontal", "vertical"],
        default: "horizontal",
      },
    },
    addBarDataset: {
      label: "add bar dataset",
      inputType: HTMLInputType.Button,
      orderPosition: 3,
      options: {
        datasets: [],
        defaultDataset: {
          name: {
            label: "name",
            inputType: HTMLInputType.Text,
            orderPosition: 1,
            options: {},
          },
          label: {
            label: "label",
            inputType: HTMLInputType.Text,
            orderPosition: 2,
            options: {},
          },
          color: {
            label: "color",
            inputType: HTMLInputType.Color,
            orderPosition: 3,
            options: {},
          },
          xField: {
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 4,
            options: {},
          },
          yField: {
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 5,
            options: {},
          },
        },
      },
    },
    addLineDataset: {
      label: "add Line dataset",
      inputType: HTMLInputType.Button,
      orderPosition: 4,
      options: {
        datasets: [],
        defaultDataset: {
          name: {
            label: "name",
            inputType: HTMLInputType.Text,
            orderPosition: 1,
            options: {},
          },
          label: {
            label: "label",
            inputType: HTMLInputType.Text,
            orderPosition: 2,
            options: {},
          },
          color: {
            label: "color",
            inputType: HTMLInputType.Color,
            orderPosition: 3,
            options: {},
          },
          xField: {
            label: "x-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 4,
            options: {},
          },
          yField: {
            label: "y-axis field",
            inputType: HTMLInputType.Text,
            orderPosition: 5,
            options: {},
          },
          chartStyle: {
            label: "chart style",
            inputType: HTMLInputType.Select,
            orderPosition: 6,
            options: {
              options: ["dotted", "normal"],
              default: "normal",
            },
          },
          areaUnderTheLineColor: {
            label: "color of area under line",
            inputType: HTMLInputType.Color,
            orderPosition: 7,
            options: {},
          },
        },
      },
    },
  },
};

// FIXME: Create more

// const visualizationTypeIcons: { [key: string]: string } = {
//   text: whiteTextIcon,
//   list: whiteListIcon,
//   bar: whiteBarChartIcon,
//   mixed: whiteMixedChartIcon,
//   pie: whitePieChartIcon,
//   donut: whiteDonutChartIcon,
//   scatter: whiteScatterChartIcon,
//   line: whiteLineChartIcon,
//   "stacked-line": whiteStackedLineChartIcon,
//   "stacked-bar": whiteStackedBarChartIcon,
//   table: whiteTableIcon,
// };

// // Ordered Lists
// type OrderedList struct {
// 	BaseVisualization
// 	Style string `json:"style"` // upper-roman, lower-alpha
// 	ValueField string `json:"value_field"`
// }

// // Unorderd Lists
// type UnorderedList struct {
// 	BaseVisualization
// 	Style string `json:"style"` // circle, square
// 	ValueField string `json:"value_field"`
// }

// // Text
// type Text struct {
// 	BaseVisualization
// 	FontSize int64 `json:"font_size"`
// 	ValueField string `json:"value_field"`
// 	Bold bool `json:"bold"`
// 	Italic bool `json:"italic"`
// 	Alignment string `json:"alignment"` // right, left, center
// }

// // Piechart
// type PieChart struct {
// 	BaseVisualization
// 	ValueField string `json:"value_field"`
// 	LabelField string `json:"label_field"`
// }
