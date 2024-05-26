import { layout } from "../dagre/index";
import { Graph } from "../graphlib/index";

import type { GraphParamsProvider } from "./GraphParamsProvider.ts";
import type { Transition } from "./Transition.ts";
import type { TransitionsGraph } from "./TransitionsGraph.ts";
import type { StateGraphNode } from "./StateGraphNode.ts";
import type { StateGraphEdge } from "./StateGraphEdge.ts";

/**
 * Build graphs corresponding to the specified transitions.
 * @param transitions - The transitions between states.
 * @param newId - A function that generates unique ids for nodes and edges.
 * @param getStateParams - A function that returns the dimensions of a state node.
 * @param getTransitionParams - A function that returns the dimensions of a transition edge.
 * @param initialStateKey - The key for the initial state.
 * @param finalStateKey - The key for the final state.
 * @param vertical - Whether the graph should be vertical.
 * @returns {TransitionsGraph} - The graph with nodes and edges.
 */

export function buildFlatCharts({
  transitions,
  newId,
  getStateParams,
  getTransitionParams,
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
  vertical = false,
}: {
  transitions: Transition[];
  newId: (prefix: string) => string;
  initialStateKey?: string;
  finalStateKey?: string;
  vertical?: boolean;
} & GraphParamsProvider): TransitionsGraph {
  const graph = new Graph({
    directed: true,
  })
    .setGraph({ rankdir: vertical ? "tb" : "lr" })
    .setDefaultEdgeLabel(() => ({}));

  const nodesIndex: Record<string, string> = {};

  const getStateNodeId = (key: string, state: string = key) => {
    let id = nodesIndex[key];
    if (!id) {
      id = nodesIndex[key] = newId("s");
      const params = getStateParams(key, state);
      graph.setNode(id, { id, ...params });
    }
    return id;
  };

  for (const [fromState, event, toState] of transitions) {
    const fromStateKey = fromState || initialStateKey;
    const from = getStateNodeId(fromStateKey, fromState);
    const toStateKey = toState || finalStateKey;
    const to = getStateNodeId(toStateKey, toState);
    const params = getTransitionParams(fromStateKey, event, toStateKey);
    graph.setEdge(from, to, {
      id: newId("t"),
      ...params,
    });
  }
  layout(graph, { rankdir: vertical ? "tb" : "lr" });
  // console.log(graph);
  const nodes = graph.nodes().map((id: string) => {
    const n = graph.node(id) as StateGraphNode;
    n.x -= n.width / 2;
    n.y -= n.height / 2;
    return n;
  });
  const edges = graph
    .edges()
    .map(({ v, w, name }: { v: string; w: string; name: string }) => {
      const e = graph.edge(v, w, name) as StateGraphEdge;
      e.x -= e.width / 2;
      e.y -= e.height / 2;
      return e;
    });

  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
  for (const node of nodes) {
    x = Math.min(x, node.x);
    y = Math.min(y, node.y);
    width = Math.max(width, node.x + node.width);
    height = Math.max(height, node.y + node.height);
  }
  for (const edge of edges) {
    x = Math.min(x, edge.x);
    y = Math.min(y, edge.y);
    width = Math.max(width, edge.x + edge.width);
    height = Math.max(height, edge.y + edge.height);
    for (const point of edge.points) {
      x = Math.min(x, edge.x);
      y = Math.min(y, edge.y);
      width = Math.max(width, point.x);
      height = Math.max(height, point.y);
    }
  }
  width -= x;
  height -= y;
  return { x, y, width, height, nodes, edges };
}
