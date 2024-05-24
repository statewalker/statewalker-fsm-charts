import { layout, graphlib } from "dagre";
import { GraphParamsProvider } from "./GraphParamsProvider.ts";
import { Transition } from "./Transition.ts";
import { TransitionsGraph } from "./TransitionsGraph.ts";

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

export function buildGraph({
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
  const graph = new graphlib.Graph({
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
  layout(graph);
  // console.log(graph);
  const nodes = graph.nodes().map((id: string) => graph.node(id));
  const edges = graph
    .edges()
    .map((edge: { v: string; w: string }) => graph.edge(edge));

  let width = 0;
  let height = 0;
  for (const node of nodes) {
    width = Math.max(width, node.x + node.width);
    height = Math.max(height, node.y + node.height);
  }
  for (const edge of edges) {
    width = Math.max(width, edge.x + edge.width);
    height = Math.max(height, edge.y + edge.height);
    for (const point of edge.points) {
      width = Math.max(width, point.x);
      height = Math.max(height, point.y);
    }
  }
  return { width, height, nodes, edges };
}
