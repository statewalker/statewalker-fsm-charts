import { Dimensions } from "./Dimensions.ts";
import { Position } from "./Position.ts";

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
