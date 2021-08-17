/**
 * The module for displaying a visual basing on the visual type
 */

import React from "react";
import { useMemo } from "react";
import { ClientJson, VisualizationProp } from "../../../data/types";
import {
  BarChartType,
  datasetConfigSeparator,
  DoughnutChartType,
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
import PieChartVisual from "../General/PieChartVisual";
import DoughnutChartVisual from "../General/DoughnutChartVisual";

export default function GeneralVisual({
  data,
  type,
  config,
  height,
  width,
  orderBy,
  datasetIds = [],
}: {
  data: ClientJson;
  type: string;
  config: VisualizationProp[];
  height: number;
  width: number;
  orderBy: string;
  datasetIds?: string[];
}) {
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
          sortBy={orderBy}
          columnOrderString={configObject.columnOrder.value}
        />
      );

    case TextType.name:
      return (
        <TextTypeVisual
          sortBy={orderBy}
          configObject={configObject}
          data={data}
        />
      );

    case OrderedListType.name:
      return (
        <OrderedListTypeVisual
          sortBy={orderBy}
          configObject={configObject}
          data={data}
        />
      );

    case UnorderedListType.name:
      return (
        <UnorderedListTypeVisual
          sortBy={orderBy}
          configObject={configObject}
          data={data}
        />
      );

    case ScatterChartType.name:
      return (
        <ScatterVisual
          data={data}
          sortBy={orderBy}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

    case BarChartType.name:
      return (
        <BarChartVisual
          sortBy={orderBy}
          data={data}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

    case MultipleBarChartType.name:
      return (
        <MultipleBarChartVisual
          sortBy={orderBy}
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
          sortBy={orderBy}
          data={data}
          configObject={configObject}
          height={height}
          width={width}
        />
      );

    case MultipleLineChartType.name:
      return (
        <MultipleLineChartVisual
          sortBy={orderBy}
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
          sortBy={orderBy}
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    case PieChartType.name:
      return (
        <PieChartVisual
          sortBy={orderBy}
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    case DoughnutChartType.name:
      return (
        <DoughnutChartVisual
          sortBy={orderBy}
          data={data}
          configObject={configObject}
          height={height}
          width={width}
          datasetConfigs={datasetConfigs}
        />
      );

    default:
      return <div className="error">Visualization type not supported</div>;
  }
}
