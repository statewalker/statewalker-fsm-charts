import type { StateGraphNode } from "./StateGraphNode.ts";
import type { TransitionsGraph } from "./TransitionsGraph.ts";

export type StateChart = TransitionsGraph &
  StateGraphNode & {
    children?: StateChart[];
  } & Record<string, any>;
