import type { Dimensions } from "./Dimensions.ts";
import { Label } from "./Label.ts";

/**
 * Provides default functions measuring dimensions for state nodes and transition edges in the graph.
 */
export type GraphParamsProvider = {
  getStateParams: (
    stateKey: string,
    state?: string,
  ) => Dimensions & Label & Record<string, any>;
  getTransitionParams: (
    fromStateKey: string,
    event: string,
    toStateKey: string,
  ) => Dimensions & Label & Record<string, any>;
};
