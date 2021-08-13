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
  shouldAppendNewData: boolean;
  ttlInSeconds?: number;
  type: VisualizationType;
  errors: { [key: string]: string };
}

export interface VisualizationType {
  name: string;
  icon: string;
  config: VisualizationProp[];
  addMoreConfigsButtons?: AddMoreConfigsProp[];
  datasetIds?: string[];
}

export interface AddMoreConfigsProp {
  label: string;
  datasetConfigGenerator: (time: Date) => {
    configs: VisualizationProp[];
    id: string;
  };
}

export interface VisualizationProp {
  name: string;
  label: string;
  inputType: HTMLInputType;
  options: { [key: string]: any };
  value?: any;
  error?: string;
  required?: boolean;
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
}

export interface ClientJson {
  isMultiple: boolean;
  meta: ClientJsonMeta;
  data: ClientJsonDataset | { [key: string]: ClientJsonDataset };
}

export interface ClientJsonMeta {
  source?: string;
  primaryFields: string[];
  separator: string;
  cron?: string;
  [key: string]: any;
}

export interface ClientJsonDataset {
  [key: string]: { [key: string]: any };
}
