/**
 * The module for displaying a visual basing on the visual type
 */

import React from "react";
import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";
import {
  BarChartType,
  DonutChartType,
  LineChartType,
  MixedChartType,
  MultipleBarChartType,
  MultipleLineChartType,
  OrderedListType,
  PieChartType,
  ScatterChartType,
  TableType,
  TextType,
  UnorderedListType,
} from "../../../data/visualization-types";
import OrderedListTypeVisual from "../General/OrderedListTypeVisual";
import TableTypeVisual from "../General/TableTypeVisual";
import TextTypeVisual from "../General/TextTypeVisual";
import UnorderedListTypeVisual from "../General/UnorderedListTypeVisual";

export default function GeneralVisual({
  data,
  type,
  width,
  height,
  config,
}: {
  data: ClientJson;
  type: string;
  width: number;
  height: number;
  config: VisualizationProp[];
}) {
  /*
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
    */
  const configObject = useMemo(() => {
    const obj: { [key: string]: VisualizationProp } = {};
    for (let item of config) {
      obj[item.name] = { ...item };
    }
    return obj;
  }, [config]);

  switch (type) {
    case TableType.name:
      return (
        <TableTypeVisual
          data={data}
          height={height}
          width={width}
          columnOrderString={configObject.columnOrder.value}
        />
      );

    case TextType.name:
      return (
        <TextTypeVisual
          width={width}
          height={height}
          configObject={configObject}
          data={data}
        />
      );

    case OrderedListType.name:
      return (
        <OrderedListTypeVisual
          height={height}
          width={width}
          configObject={configObject}
          data={data}
        />
      );

    case UnorderedListType.name:
      return (
        <UnorderedListTypeVisual
          height={height}
          width={width}
          configObject={configObject}
          data={data}
        />
      );

    case ScatterChartType.name:
      return <div>Scatter chart</div>;

    case BarChartType.name:
      return <div>Bar chart</div>;

    case MultipleBarChartType.name:
      return <div>Multiple bar chart</div>;

    case LineChartType.name:
      return <div>Line chart</div>;

    case MultipleLineChartType.name:
      return <div>Multiple line chart</div>;

    case MixedChartType.name:
      return <div>Mixed chart</div>;

    case PieChartType.name:
      return <div>Pie chart</div>;

    case DonutChartType.name:
      return <div>Donut chart</div>;

    default:
      return <div>Visualization type not supported</div>;
  }
}
