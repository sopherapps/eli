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
import ScatterVisual from "../General/ScatterVisual";
import BarChartVisual from "../General/BarChartVisual";

export default function GeneralVisual({
  data,
  type,
  config,
  height,
  width,
}: {
  data: ClientJson;
  type: string;
  config: VisualizationProp[];
  height: number;
  width: number;
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
          columnOrderString={configObject.columnOrder.value}
        />
      );

    case TextType.name:
      return <TextTypeVisual configObject={configObject} data={data} />;

    case OrderedListType.name:
      return <OrderedListTypeVisual configObject={configObject} data={data} />;

    case UnorderedListType.name:
      return (
        <UnorderedListTypeVisual configObject={configObject} data={data} />
      );

    case ScatterChartType.name:
      return (
        <ScatterVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

    case BarChartType.name:
      return (
        <BarChartVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

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
      return <div className="error">Visualization type not supported</div>;
  }
}
