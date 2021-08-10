/**
 * Entry point for the data package.
 */

import { VisualizationType } from "./types";
import {
  TableType,
  ScatterChartType,
  BarChartType,
  MultipleBarChartType,
  LineChartType,
  MultipleLineChartType,
  MixedChartType,
  PieChartType,
  DonutChartType,
  TextType,
  OrderedListType,
  UnorderedListType,
} from "./visualization-types";

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
