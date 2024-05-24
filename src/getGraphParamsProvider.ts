import { Dimensions } from "./Dimensions.ts";
import { getLabelDimensions } from "./getLabelDimensions.ts";
import { GraphParamsProvider } from "./GraphParamsProvider.ts";
import { Padding } from "./Padding.ts";

/**
 * Provides default functions measuring dimensions for state nodes and transition edges in the graph.
 * @param fontSize - The font size for the state and transition labels.
 * @param stateFontSize - The font size for the state labels.
 * @param stateLineHeight - The line height for the state labels.
 * @param stateTextPadding - The padding around the state labels.
 * @param transitionsFontSize - The font size for the transition labels.
 * @param transitionsTextPadding - The padding around the transition labels.
 * @param transitionsLineHeight - The line height for the transition labels.
 */

export function getGraphParamsProvider({
  fontSize = 14, stateFontSize = fontSize, stateLineHeight = stateFontSize * 1.2, stateTextPadding = 0, transitionsFontSize = fontSize, transitionsLineHeight = transitionsFontSize * 1.2, transitionsTextPadding = 0,
}: {
  fontSize?: number;
  stateFontSize?: number;
  stateLineHeight?: number;
  stateTextPadding?: Padding;
  transitionsFontSize?: number;
  transitionsTextPadding?: Padding;
  transitionsLineHeight?: number;
} = {}): GraphParamsProvider {
  return {
    getStateParams: (stateKey: string, state: string) => {
      return {
        ...getLabelDimensions(state, {
          padding: stateTextPadding,
          fontSize: stateFontSize,
          lineHeight: stateLineHeight,
        }),
        state,
        key: stateKey,
      };
    },
    getTransitionParams: (
      fromStateKey: string,
      event: string,
      toStateKey: string
    ): Dimensions & Record<string, any> => {
      return {
        ...getLabelDimensions(event, {
          padding: transitionsTextPadding,
          fontSize: transitionsFontSize,
          lineHeight: transitionsLineHeight,
        }),
        from: fromStateKey,
        event,
        to: toStateKey,
      };
    },
  };
}
