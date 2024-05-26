import { Dimensions } from "./Dimensions";
import { Position } from "./Position";

/**
 * Information about a state node in the graph.
 */
export type StateGraphNode = Dimensions &
  Position & {
    id: string;
    key: string;
    state: string;
  } & Record<string, any>;
