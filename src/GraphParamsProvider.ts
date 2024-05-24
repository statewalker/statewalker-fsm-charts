import { Dimensions } from "./Dimensions.ts";

/**
 * Provides default functions measuring dimensions for state nodes and transition edges in the graph.
 */
export type GraphParamsProvider = {
  getStateParams: (
    stateKey: string,
    state: string
  ) => Dimensions & Record<string, any>;
  getTransitionParams: (
    fromStateKey: string,
    event: string,
    toStateKey: string
  ) => Dimensions & Record<string, any>;
};

