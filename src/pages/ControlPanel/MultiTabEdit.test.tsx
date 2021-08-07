import React from "react";
import renderer from "react-test-renderer";
import { defaultUserAppConfig, UserAppConfigContext } from "../../context";
import MultiEdit from "./MultiTabEdit";

test("renders the MultiEdit screen correctly", () => {
  const appConfig = { ...defaultUserAppConfig };
  appConfig.tabs = {
    hi: { id: "hi", title: "hi you", visualizations: {}, order: [] },
    hello: { id: "hello", title: "hello ha", visualizations: {}, order: [] },
  };
  appConfig.tabOrder = ["hi", "hello"];

  const tree = renderer
    .create(
      <UserAppConfigContext.Provider value={appConfig}>
        <MultiEdit />
      </UserAppConfigContext.Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
