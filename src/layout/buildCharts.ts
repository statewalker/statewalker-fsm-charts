import type { GraphParamsProvider } from "../types/GraphParamsProvider.ts";
import type { Padding } from "../types/Padding.ts";
import type { FsmStateConfig } from "../types/FsmStateConfig.ts";
import type { StateChart } from "../types/StateChart.ts";

import { buildFlatCharts } from "./buildFlatCharts.ts";
/**
 * Build graphs corresponding to the specified transitions.
 * @param config - State configuration with transitions and sub-states.
 * @param newId - A function that generates unique ids for nodes and edges.
 * @param getStateParams - A function that returns the dimensions of a state node.
 * @param getTransitionParams - A function that returns the dimensions of a transition edge.
 * @param initialStateKey - The key for the initial state.
 * @param finalStateKey - The key for the final state.
 * @returns {StateChart} - The graph with nodes and edges.
 */
export function buildCharts({
  lodash,
  config,
  newId,
  getStateParams,
  getTransitionParams,
  padding = [5, 5],
  vertical = false,
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
  direction,
}: {
  config: FsmStateConfig;
  lodash: any;
  newId: (prefix: string) => string;
  initialStateKey?: string;
  finalStateKey?: string;
  padding?: Padding;
  vertical?: boolean;
  direction?: "tb" | "bt" | "lr" | "rl";
} & GraphParamsProvider): StateChart {
  return buildChart(config);

  function buildChart(
    config: FsmStateConfig,
    id: string = newId("s")
  ): StateChart {
    const graph = buildFlatCharts({
      lodash,
      transitions: config.transitions || [],
      newId,
      getStateParams,
      getTransitionParams,
      padding,
      initialStateKey,
      finalStateKey,
      vertical,
      direction
    });
    const index = graph.nodes.reduce((index, node) => {
      index[node.key as string] = node.id as string;
      return index;
    }, {} as Record<string, string>);

    const children: StateChart[] = [];
    if (config.states) {
      for (const child of config.states) {
        const childId = index[child.key];
        children.push(buildChart(child, childId));
      }
    }
    return {
      id,
      key: config.key,
      state: config.key,
      ...graph,
      children,
    };
  }
}
