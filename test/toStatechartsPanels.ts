import * as lodash from "lodash-es";
import {
  type FsmStateConfig,
  getGraphParamsProvider,
  buildCharts,
  buildStatechartsPanel,
} from "../src/index.ts";

export function toStatechartsPanels(config: FsmStateConfig) {
  let idCounter = 0;
  const newId = (prefix: string) => `${prefix}_${idCounter++}`;
  const { getStateParams, getTransitionParams } = getGraphParamsProvider({
    // fontSize: 14,
    stateFontSize: 14,
    stateTextPadding: [14, 16],
    transitionsFontSize: 12,
    transitionsTextPadding: 6,
  });

  const statechart = buildCharts({
    lodash,
    config,
    newId,
    getStateParams,
    getTransitionParams,
    padding: [15, 15],
  });
  const lines: string[] = [];
  buildStatechartsPanel({
    statechart,
    newId,
    println: (str: string) => lines.push(str),
  });
  const svg = lines.join("\n");
  return {
    svg,
    statechart,
  };
}
