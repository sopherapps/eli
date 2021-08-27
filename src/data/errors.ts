/**
 * Module for handling errors to do with the data
 */

import { Visualization } from "./types";

/**
 * Compiles the errors of the visualization and returns them as a list of strings
 * @param visualization - the visualization whose errors are to be compiled and returned
 * @returns {string[]}
 */
export function extractErrors(visualization: Visualization): string[] {
  const emptyValues = ["", undefined, null];

  const mainErrors: string[] = Object.values(visualization.errors).filter(
    (value) => !emptyValues.includes(value)
  );

  // @ts-ignore
  const configErrors: string[] = visualization.type.config
    .map((value) => value.error)
    .filter((value) => !emptyValues.includes(value));

  return [...mainErrors, ...configErrors];
}

/**
 * Validates a given validation based on its fields and the config of the visualization type
 * returning an object of label/name and string
 * @param visualization - the visualization to be validated
 */
export function validate(visualization: Visualization): {
  [key: string]: string;
} {
  const emptyValues = ["", undefined, null];
  const result: { [key: string]: string } = {};

  if (!visualization.title.trim()) {
    result["title"] = "The title of the visualization should be non-empty";
  }

  if (!/wss?:\/\/.*/.test(visualization.dataSourceUrl)) {
    result["dataSourceUrl"] = "'Data Source URL' is not a valid websocket URL";
  }

  if (visualization.height > 100 || visualization.height < 0) {
    result["height"] = "'Height (% of screen)' should be between 0 and 100";
  }

  if (visualization.width > 100 || visualization.width < 0) {
    result["width"] = "'Width (% of screen)' should be between 0 and 100";
  }

  if (!/^-?[\w -]+(,-?[\w -]+)*$/.test(visualization.orderBy)) {
    result["orderBy"] =
      "'Sort by' should be a comma separated list of fields, with descending fields having a '-' suffix";
  }

  if (
    visualization.shouldAppendNewData &&
    visualization.ttlInSeconds === undefined
  ) {
    result["ttlInSeconds"] =
      "'Lifespan of each Datapoint in seconds' should be set if 'Append new data to old data' is true";
  }

  for (let config of visualization.type.config) {
    let errorMessage = "";
    if (config.required && emptyValues.includes(config.value)) {
      errorMessage += `'${config.label}' is required. `;
    }

    if (
      config.options.min &&
      typeof config.value === "number" &&
      config.value < config.options.min
    ) {
      errorMessage += `'${config.label}' should be at least ${config.options.min}. `;
    }

    if (
      config.options.max &&
      typeof config.value === "number" &&
      config.value > config.options.max
    ) {
      errorMessage += `'${config.label}' should be at most ${config.options.max}. `;
    }

    if (
      config.options.pattern &&
      typeof config.value === "string" &&
      !new RegExp(config.options.patter).test(config.value)
    ) {
      errorMessage += `'${config.label}' is not of expected format. `;
    }

    result[`config.${config.name}`] = errorMessage.trim();
  }

  return result;
}
