import type {
  TransitionsGraph,
  Padding,
  StateGraphNode,
  StateGraphEdge,
} from "../layout/index.ts";
import { getPadding } from "../utils/getPadding.ts";
import { printArrows } from "./printArrows.ts";
import { printBoxes } from "./printBoxes.ts";
import { printGroup } from "./printGroup.ts";
import { printLabels } from "./printLabels.ts";
import { translate } from "./translate.ts";
import { translateBox } from "./translateBox.ts";

export function buildSvg({
  graph: { width: initialWidth, height: initialHeight, nodes, edges },
  newId,
  stateFontSize = 14,
  transitionFontSize = 12,
  padding = stateFontSize,
  println,
}: {
  graph: TransitionsGraph;
  newId: (prefix: string) => string;
  println: (str: string) => void;
  stateFontSize?: number;
  transitionFontSize?: number;
  padding?: Padding;
}) {
  const svgPadding = getPadding(padding);
  const width = Math.ceil(initialWidth + svgPadding[1] + svgPadding[3]);
  const height = Math.ceil(initialHeight + svgPadding[0] + svgPadding[2]);
  println(`<div style="max-width: 100%; overflow: auto;">`);
  println(`<svg width="${width}" height="${height}" class="statechart">`);
  println(`<g>
    <rect x="0" y="0" width="${width}" height="${height}" class="background" style="fill:none; stroke: red;"/>
  </g>`);

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

  printBoxes<StateGraphNode>({
    ...stateBoxTranslations,
    println,
    borderRadius: () => stateFontSize / 2,
    className: () => "state-background",
  })(nodes);

  const markerId = newId("marker");
  printGroup<StateGraphEdge>({
    ...translations,
    println,
    action: printArrows({ println, position: translations.position, markerId }),
  })(edges);

  printBoxes<StateGraphEdge>({
    ...transitionBoxTanslations,
    println,
    className: () => "transition-background",
  })(edges);

  printLabels<StateGraphEdge>({
    ...transitionBoxTanslations,
    println,
    padding: (d) => getPadding(d.padding),
    label: (d) => d.event,
    fontSize: () => transitionFontSize,
    className: () => "transition-label",
  })(edges);

  printLabels<StateGraphNode>({
    ...translations,
    println,
    padding: (d) => getPadding(d.padding),
    label: (d) => d.state,
    fontSize: () => stateFontSize,
    className: () => "state-label",
  })(nodes);

  println("</svg>");
}
