import * as lodash from "lodash-es";
import {
  type FsmStateConfig,
  getGraphParamsProvider,
  buildCharts,
  buildStatechartsPanel,
  StateChart,
} from "../../src/index.ts";

export function toStatechart(config: FsmStateConfig): {
  statechart: StateChart;
  newId: (prefix?: string) => string;
} {
  let idCounter = 0;
  const newId = (prefix: string = "") => `${prefix}_${idCounter++}`;
  const { getStateParams, getTransitionParams } = getGraphParamsProvider({
    // fontSize: 14,
    stateFontSize: 14,
    stateTextPadding: [14, 16],
    transitionsFontSize: 12,
    transitionsTextPadding: 6,
    getStateLabel: (state: string) => {
      return state;
    },
    getTransitionLabel: (from: string, event: string, to: string) => {
      return event;
    },
  });

  const statechart = buildCharts({
    lodash,
    config,
    newId,
    getStateParams,
    getTransitionParams,
    padding: [15, 15],
  });
  return {
    statechart,
    newId,
  };
}

export function toStatechartsPanels(config: FsmStateConfig): {
  html: string;
  statechart: StateChart;
} {
  const { newId, statechart } = toStatechart(config);
  const lines: string[] = [];
  buildStatechartsPanel({
    statechart,
    newId,
    println: (str: string) => lines.push(str),
  });
  const html = lines.join("\n");
  return {
    html,
    statechart,
  };
}
