/**
 * The module for displaying a visual basing on the visual type
 */

import React from "react";
import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";
import {
  BarChartType,
  datasetConfigSeparator,
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
import MultipleBarChartVisual from "../General/MultipleBarChartVisual";
import LineChartVisual from "../General/LineChartVisual";
import MultipleLineChartVisual from "../General/MultipleLineChartVisual";
import MixedChartVisual from "../General/MixedChartVisual";

export default function GeneralVisual({
  data,
  type,
  config,
  height,
  width,
  datasetIds = [],
}: {
  data: ClientJson;
  type: string;
  config: VisualizationProp[];
  height: number;
  width: number;
  datasetIds?: string[];
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

  const datasetConfigs = useMemo(() => {
    const obj: { [key: string]: { [key: string]: VisualizationProp } } = {};
    const datasetNameIdMap: { [key: string]: string } = {};

    // construct the dataset configs but using the old timestamped dataset ids
    for (let item of config) {
      const [datasetId, configName] = item.name.split(datasetConfigSeparator);
      if (datasetIds.includes(datasetId)) {
        if (configName === "name") {
          datasetNameIdMap[datasetId] = configName;
        } else {
          obj[datasetId] = obj[datasetId] || {};
          obj[datasetId][configName] = { ...item };
        }
      }
    }

    // put the appropriate names for the configurations
    for (let key in obj) {
      obj[datasetNameIdMap[key]] = { ...obj[key] };
      delete obj[key];
    }
    return obj;
  }, [config, datasetIds]);

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
      return (
        <MultipleBarChartVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    case LineChartType.name:
      return (
        <LineChartVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

    case MultipleLineChartType.name:
      return (
        <MultipleLineChartVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    case MixedChartType.name:
      return (
        <MixedChartVisual
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    case PieChartType.name:
      return <div>Pie chart</div>;

    case DonutChartType.name:
      return <div>Donut chart</div>;

    default:
      return <div className="error">Visualization type not supported</div>;
  }
}
