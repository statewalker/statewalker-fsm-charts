import type { Dimensions } from "./Dimensions.ts";
import { getLabelDimensions } from "./getLabelDimensions.ts";
import { getPadding } from "../utils/getPadding.ts";
import type { GraphParamsProvider } from "./GraphParamsProvider.ts";
import type { Padding } from "./Padding.ts";

/**
 * Provides default functions measuring dimensions for state nodes and transition edges in the graph.
 * @param fontSize - The font size for the state and transition labels.
 * @param stateFontSize - The font size for the state labels.
 * @param stateTextPadding - The padding around the state labels.
 * @param transitionsFontSize - The font size for the transition labels.
 * @param transitionsTextPadding - The padding around the transition labels.
 */
export function getGraphParamsProvider({
  fontSize = 14,
  stateFontSize = fontSize,
  stateTextPadding = 0,
  transitionsFontSize = fontSize,
  transitionsTextPadding = 0,
}: {
  fontSize?: number;
  stateFontSize?: number;
  stateTextPadding?: Padding;
  transitionsFontSize?: number;
  transitionsTextPadding?: Padding;
} = {}): GraphParamsProvider {
  return {
    getStateParams: (stateKey: string, state: string = stateKey) => {
      const padding = getPadding(stateTextPadding);
      const fontSize = stateFontSize;
      return {
        ...getLabelDimensions(state, {
          padding,
          fontSize,
        }),
        state,
        key: stateKey,
        padding,
        fontSize,
      };
    },
    getTransitionParams: (
      fromStateKey: string,
      event: string,
      toStateKey: string
    ): Dimensions & Record<string, any> => {
      const padding = getPadding(transitionsTextPadding);
      const fontSize = transitionsFontSize;
      return {
        ...getLabelDimensions(event, {
          padding,
          fontSize,
        }),
        from: fromStateKey,
        event,
        to: toStateKey,
        padding,
        fontSize,
      };
    },
  };
}
