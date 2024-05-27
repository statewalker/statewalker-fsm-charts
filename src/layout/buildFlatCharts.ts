import { layout } from "../dagre/index";
import { Graph } from "../graphlib/index";

import type { GraphParamsProvider } from "./GraphParamsProvider.ts";
import type { Transition } from "./Transition.ts";
import type { TransitionsGraph } from "./TransitionsGraph.ts";
import type { StateGraphNode } from "./StateGraphNode.ts";
import type { StateGraphEdge } from "./StateGraphEdge.ts";
import { Padding } from "./Padding.ts";
import { getPadding } from "../utils/getPadding.ts";
import { Position } from "./Position.ts";
import { Dimensions } from "./Dimensions.ts";

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
  padding = [5, 5],
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
  vertical = false,
}: {
  transitions: Transition[];
  newId: (prefix: string) => string;
  initialStateKey?: string;
  finalStateKey?: string;
  vertical?: boolean;
  padding?: Padding;
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

  const [top, right, bottom, left] = getPadding(padding);

  const nodes = graph.nodes().map((id: string) => {
    const n = graph.node(id) as StateGraphNode;
    n.x += -n.width / 2;
    n.y += -n.height / 2;
    return n;
  });
  const edges = graph
    .edges()
    .map(({ v, w, name }: { v: string; w: string; name: string }) => {
      const e = graph.edge(v, w, name) as StateGraphEdge;
      e.x += -e.width / 2;
      e.y += -e.height / 2;
      return e;
    });

  // Get the bounding box of the graph
  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
  const addCoords = (node: StateGraphNode | StateGraphEdge) => {
    x = Math.min(x, node.x);
    y = Math.min(y, node.y);
    width = Math.max(width, node.x + node.width);
    height = Math.max(height, node.y + node.height);
  };
  nodes.forEach(addCoords);
  edges.forEach(addCoords);
  edges.forEach((edge) => {
    for (const point of edge.points) {
      x = Math.min(x, edge.x);
      y = Math.min(y, edge.y);
      width = Math.max(width, point.x);
      height = Math.max(height, point.y);
    }
  });

  // Shift the graph to the origin taking into account the padding
  // Invert coordinates.
  width += left + right;
  height += bottom + top;
  const updateCoords = (node: Position) => {
    node.x = node.x + left;
    node.y = node.y + bottom;
    // node.y = node.y + bottom;
  };
  const updateBox = (node: Position & Dimensions) => {
    updateCoords(node);
    node.y += node.height;
  }
  nodes.forEach(updateBox);
  edges.forEach(updateBox);
  edges.forEach((edge) => {
    edge.points.forEach(updateCoords);
  });

  return { x, y, width, height, nodes, edges };
}
