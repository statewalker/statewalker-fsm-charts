import type { Dimensions } from "./Dimensions.ts";
import type { Position } from "./Position.ts";
import type { StateGraphEdge } from "./StateGraphEdge.ts";
import type { StateGraphNode } from "./StateGraphNode.ts";

/**
 * Coordinates for state nodes and endges corresponding to state transitions.
 */
export type TransitionsGraph = Position &
  Dimensions & {
    nodes: StateGraphNode[];
    edges: StateGraphEdge[];
  };
