import type { Dimensions } from "./Dimensions.ts";
import type { Position } from "./Position.ts";

/**
 * Information about a state graph edge.
 */
export type StateGraphEdge = Dimensions &
  Position & {
    id: string;
    from: string;
    event: string;
    to: string;
    points: Position[];
  } & Record<string, any>;
