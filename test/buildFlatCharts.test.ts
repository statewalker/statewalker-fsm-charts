import * as lodash from "lodash-es";
import { buildFlatCharts } from "../src/layout/buildFlatCharts.ts";
import { TransitionsGraph } from "../src/layout/TransitionsGraph.ts";
import { getGraphParamsProvider } from "../src/layout/getGraphParamsProvider.ts";
import { Transition } from "../src/layout/Transition.ts";
import { describe, it, expect } from "./deps.ts";
import { tests } from "./buildFlatSvgCharts.test-data.ts";
import { setLodash } from "../src/lodash-es/index.ts";

describe("buildFlatCharts", () => {
  for (const { message, transitions, control } of tests) {
    it(message, () => {
      testCharts(transitions, control);
    });
  }

  function testCharts(transitions: Transition[], expected: TransitionsGraph) {
    let idCounter = 0;
    const { getStateParams, getTransitionParams } = getGraphParamsProvider({
      stateFontSize: 14,
      stateTextPadding: 3,
      transitionsFontSize: 12,
      transitionsTextPadding: 3,
    });
    const result = buildFlatCharts({
      lodash,
      transitions,
      newId: (prefix: string) => `${prefix}_${idCounter++}`,
      getStateParams,
      getTransitionParams,
    });
    try {
      expect(result).toEqual(expected);
    } catch (err) {
      console.log(JSON.stringify(result, null, 2));
      throw err;
    }
  }
});
