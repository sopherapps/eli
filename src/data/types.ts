/**
 * Module contains the typescript types relevant to the data layer
 */
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
