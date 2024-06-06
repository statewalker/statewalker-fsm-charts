import type { TransitionsGraph } from "./TransitionsGraph.ts";

export type StateChart = TransitionsGraph & {
  id: string;
  key: string;
  children?: StateChart[];
} & Record<string, any>;
