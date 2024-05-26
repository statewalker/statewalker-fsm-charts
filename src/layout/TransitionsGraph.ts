import { Dimensions } from "./Dimensions.ts";
import { Position } from "./Position.ts";
import { StateGraphEdge } from "./StateGraphEdge.ts";
import { StateGraphNode } from "./StateGraphNode.ts";

/**
 * Coordinates for state nodes and endges corresponding to state transitions.
 */
export type TransitionsGraph = Position &
  Dimensions & {
    nodes: StateGraphNode[];
    edges: StateGraphEdge[];
  };
