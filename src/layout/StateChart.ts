import type { TransitionsGraph } from "./TransitionsGraph.ts";

export type StateChart = {
  id: string;
  key: string;
  children?: StateChart[];
  graph: TransitionsGraph;
} & Record<string, any>;
