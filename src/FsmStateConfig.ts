export type FsmStateConfig = {
  key : string;
  transitions: [string, string, string][];
  states?: FsmStateConfig[];
}