/**
 * Module to refill the storage of the app with tab data
 */

import { tabsKey, tabOrderKey } from "../config";

/**
 * Adds mock tab and tab order data to localstorage to be used during tests
 */
export function addMockTabs() {
  localStorage.setItem(tabsKey, JSON.stringify(mockTabData));
  localStorage.setItem(tabOrderKey, JSON.stringify(mockTabOrderData));
}

export const mockTabOrderData = ["1628611930669-0"];

export const mockTabData = {
  "1628611930669-0": {
    id: "1628611930669-0",
    title: "Elexon REST",
    visualizations: {
      "1629311252723": {
        id: "1629311252723",
        title: "Actual Aggregated Generation Per Type",
        dataSourceUrl:
          "wss://pubsubq.sopherapps.com/receive/actual_aggregated_generation_output_per_type?subscriberId=furyu",
        width: 50,
        height: 50,
        type: {
          name: "multiple-line-chart",
          icon: "/static/media/stacked_line_chart_white.08a97c45.svg",
          config: [
            {
              name: "1629311317882-add-ln-dt_%&*Yu_name",
              label: "name",
              inputType: 0,
              required: true,
              options: {},
              value: '"Biomass"',
              error: "",
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_label",
              label: "label",
              inputType: 0,
              required: true,
              options: {},
              value: "biomass",
              error: "",
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_color",
              label: "color",
              inputType: 7,
              required: true,
              options: {},
              value: "#3b7330",
              error: "",
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_xField",
              label: "x-axis field",
              inputType: 0,
              required: true,
              options: {},
              value: "settlementPeriod",
              error: "",
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_yField",
              label: "y-axis field",
              inputType: 0,
              required: true,
              options: {},
              value: "quantity",
              error: "",
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_chartStyle",
              label: "chart style",
              inputType: 12,
              options: {
                options: ["dotted", "normal"],
                default: "normal",
              },
            },
            {
              name: "1629311317882-add-ln-dt_%&*Yu_areaUnderTheLineColor",
              label: "color of area under line",
              inputType: 7,
              options: {},
            },
          ],
          addMoreConfigsButtons: [
            {
              label: "add dataset",
            },
          ],
          datasetIds: ["1629311317882-add-ln-dt"],
        },
        errors: {
          dataSourceUrl: "",
          orderBy: "",
          ttlInSeconds: "",
          title: "",
        },
        orderBy: "settlementDate,settlementPeriod",
        shouldAppendNewData: true,
        ttlInSeconds: "7200",
      },
    },
    order: ["1629311252723"],
  },
};
