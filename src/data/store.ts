/**
 * Module containing the utilities for storing data
 */

import { ClientJson, StoredData, Visualization } from "./types";

/**
 * Extracts the current data from historical data to be shown in the visualization
 * @param visualization - the visualization whose data is to be extracted
 * @param isDataMultiple - if data has multiple datasets
 * @returns {ClientJson}
 */
export function getCurrentDataFromStore(
  visualization: Visualization,
  isDataMultiple: boolean
): ClientJson {
  const storeKey = getVisualizationStoreKey(visualization);
  const storeData: StoredData = JSON.parse(
    sessionStorage.getItem(storeKey) || "{}"
  );
  let currentData: ClientJson = {
    isMultiple: false,
    meta: { separator: "", primaryFields: [] },
    data: {},
  };

  if (isDataMultiple) {
    for (let key in storeData) {
      const message = storeData[key];
      currentData = {
        ...currentData,
        ...message,
        data: { ...currentData.data },
      };

      for (let dataset in message.data) {
        currentData.data[dataset] = {
          ...(currentData.data[dataset] || {}),
          ...message.data[dataset],
        };
      }
    }
  } else {
    for (let key in storeData) {
      const message = storeData[key];
      currentData = {
        ...currentData,
        ...message,
        data: { ...currentData.data, ...message.data },
      };
    }
  }

  return currentData;
}

/**
 * Removes stale data from the session for the given visualization
 * @param visualization - the visualization whose data is to be pruned
 */
export function removeStaleData(visualization: Visualization) {
  const storeKey = getVisualizationStoreKey(visualization);
  const lastValidTimestamp =
    new Date().getTime() - (visualization.ttlInSeconds || 3) * 1000; // default to 50 minutes
  const historicalData: StoredData = JSON.parse(
    sessionStorage.getItem(storeKey) || "{}"
  );

  for (let key in historicalData) {
    const timestamp = parseInt(key);

    if (timestamp < lastValidTimestamp) {
      delete historicalData[timestamp];
    }
  }

  sessionStorage.setItem(storeKey, JSON.stringify(historicalData));
}

/**
 * Updates the data stored in the store, appending it to the old if the visualization
 * requires that or just replacing the old
 * @param visualization - the visualization whose data is to be stored
 * @param data - the new data received
 */
export function updateStore(visualization: Visualization, data: ClientJson) {
  const storeKey = getVisualizationStoreKey(visualization);
  let newData: StoredData = {
    [new Date().getTime()]: data,
  };

  if (visualization.shouldAppendNewData) {
    const oldData: StoredData = JSON.parse(
      sessionStorage.getItem(storeKey) || "{}"
    );
    newData = { ...oldData, ...newData };
  }

  sessionStorage.setItem(storeKey, JSON.stringify(newData));
}

/**
 * Gets the store key for the given visualization
 * @param visualization - the visualization under consideration
 * @returns {string}
 */
function getVisualizationStoreKey(visualization: Visualization) {
  return `${visualization.id}-${visualization.dataSourceUrl}`;
}
