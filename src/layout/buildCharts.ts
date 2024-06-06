import type { GraphParamsProvider } from "./GraphParamsProvider.ts";
import type { StateGraphNode } from "./StateGraphNode.ts";
import type { StateGraphEdge } from "./StateGraphEdge.ts";
import type { Padding } from "./Padding.ts";
import type { Position } from "./Position.ts";
import type { Dimensions } from "./Dimensions.ts";
import type { FsmStateConfig } from "../FsmStateConfig.ts";
import type { StateChart } from "./StateChart.ts";

import { layout } from "../dagre/layout.js";
import { Graph } from "../graphlib/graph.js";
import { getPadding } from "../utils/getPadding.ts";
import { getLodash, setLodash } from "../lodash-es/index.ts";
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
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
}: {
  config: FsmStateConfig;
  lodash: any;
  newId: (prefix: string) => string;
  initialStateKey?: string;
  finalStateKey?: string;
  padding?: Padding;
} & GraphParamsProvider): StateChart {
  return buildChart(config);

  function buildChart(config: FsmStateConfig, id: string = newId("s")) {
    const graph = buildFlatCharts({
      lodash,
      transitions: config.transitions,
      newId,
      getStateParams,
      getTransitionParams,
      padding,
      initialStateKey,
      finalStateKey,
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
      ...graph,
      children,
    };
  }
}
