import { Dimensions } from "./Dimensions.ts";
import { StateGraphEdge } from "./StateGraphEdge.ts";
import { StateGraphNode } from "./StateGraphNode.ts";

/**
 * Coordinates for state nodes and endges corresponding to state transitions.
 */
export type TransitionsGraph = Dimensions & {
  nodes: StateGraphNode[];
  edges: StateGraphEdge[];
};
