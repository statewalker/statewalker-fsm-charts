import type { Transition } from "./Transition.ts";

export type FsmStateConfig = {
  key: string;
  transitions: Transition[];
  states?: FsmStateConfig[];
};
