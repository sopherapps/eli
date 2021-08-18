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
