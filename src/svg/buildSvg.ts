import type {
  TransitionsGraph,
  Padding,
  StateGraphNode,
  StateGraphEdge,
} from "../layout/index.ts";
import { getPadding } from "../utils/getPadding.ts";
import { printArrows } from "./printArrows.ts";
import { printArrowsEnd } from "./printArrowsEnd.ts";
import { printBox } from "./printBox.ts";
import { printGroup } from "./printGroup.ts";
import { printLabel } from "./printLabel.ts";
import { translate } from "./translate.ts";
import { translateBox } from "./translateBox.ts";

export function buildSvg({
  graph: { width: initialWidth, height: initialHeight, nodes, edges },
  newId,
  stateFontSize = 14,
  transitionFontSize = 12,
  padding = stateFontSize,
  println,
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
}: {
  graph: TransitionsGraph;
  newId: (prefix: string) => string;
  println: (str: string) => void;
  stateFontSize?: number;
  transitionFontSize?: number;
  padding?: Padding;
  initialStateKey?: string;
  finalStateKey?: string;
}) {
  const svgPadding = getPadding(padding);
  const width = Math.ceil(initialWidth + svgPadding[1] + svgPadding[3]);
  const height = Math.ceil(initialHeight + svgPadding[0] + svgPadding[2]);

  const translations = translate(
    { width, height },
    {
      x: svgPadding[3],
      y: svgPadding[0] + svgPadding[2],
    }
  );
  const stateBoxTranslations = translateBox(translations, [3, 3]);
  const transitionBoxTanslations = translate(
    { width, height },
    {
      x: svgPadding[3],
      y: svgPadding[0] + svgPadding[2] - transitionFontSize,
      // y: svgPadding[2],
    }
  );

  const markerId = newId("marker");

  println(`<div style="max-width: 100%; overflow: auto;">`);
  println(`<svg width="${width}" height="${height}" viewbox="0 0 ${width} ${height}" class="statechart">`);

  printArrowsEnd({ println })(markerId);

  printGroup<StateGraphEdge>({
    ...translations,
    println,
    action: printArrows({ println, position: translations.position, markerId }),
  })(edges);

  printGroup<StateGraphEdge>({
    println,
    action: printBox<StateGraphEdge>({
      ...transitionBoxTanslations,
      println: (str: string) => println(`  ${str}`),
      className: () => "transition-background",
    }),
  })(edges);

  const printStateBox = printBox({
    ...stateBoxTranslations,
    println: (str: string) => println(`  ${str}`),
    borderRadius: () => stateFontSize / 2,
    className: () => "state-background",
  });
  printGroup<StateGraphNode>({
    println,
    action: (d: StateGraphNode) => {
      if (d.key !== initialStateKey && d.key !== finalStateKey) {
        printStateBox(d);
      }
    },
  })(nodes);

  // Symbols for initial and final states
  const initialStateRadius = 6;
  const finalStateRadius = initialStateRadius / 2;
  printGroup<StateGraphNode>({
    println,
    action: (d: StateGraphNode) => {
      if (d.key === initialStateKey || d.key === finalStateKey) {
        let { x, y } = stateBoxTranslations.position(d);
        const { width, height } = stateBoxTranslations.size(d);
        x += initialStateRadius;
        y -= height / 2;
        if (d.key === initialStateKey) {
          println(
            `  <circle class="state-symbol-initial" r="${initialStateRadius}" cx="${x}" cy="${y}"></circle>`
          );
        } else {
          println(
            `  <circle class="state-symbol-final" r="${initialStateRadius}" cx="${x}" cy="${y}"></circle>`
          );
          println(
            `  <circle class="state-symbol-final-inner" r="${finalStateRadius}" cx="${x}" cy="${y}"></circle>`
          );
        }
      }
    },
  })(nodes);

  printGroup<StateGraphEdge>({
    println,
    action: printLabel<StateGraphEdge>({
      ...transitionBoxTanslations,
      println: (str: string) => println(`  ${str}`),
      padding: (d) => getPadding(d.padding),
      label: (d) => d.event,
      fontSize: () => transitionFontSize,
      className: () => "transition-label",
    }),
  })(edges);

  printGroup<StateGraphNode>({
    println,
    action: printLabel<StateGraphNode>({
      ...translations,
      println: (str: string) => println(`  ${str}`),
      padding: (d) => getPadding(d.padding),
      label: (d) => d.state,
      fontSize: () => stateFontSize,
      className: () => "state-label",
    }),
  })(nodes);

  println("</svg>");
}
