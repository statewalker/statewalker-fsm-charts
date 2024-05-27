import type {
  TransitionsGraph,
  Padding,
  StateGraphNode,
  StateGraphEdge,
  Position,
  Dimensions,
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
  graph: { width, height, nodes, edges },
  newId,
  stateFontSize = 14,
  transitionFontSize = 12,
  println,
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
}: {
  graph: TransitionsGraph;
  newId: (prefix: string) => string;
  println: (str: string) => void;
  stateFontSize?: number;
  transitionFontSize?: number;
  initialStateKey?: string;
  finalStateKey?: string;
}) {
  // const translations = translate({ width, height });
  // const stateBoxTranslations = translateBox(translations, [3, 3]);
  // const transitionBoxTanslations = translate(
  //   { width, height },
  //   {
  //     x: 0,
  //     y: -transitionFontSize,
  //   }
  // );

  const markerId = newId("marker");

  println(`<div style="max-width: 100%; overflow: auto;">`);
  println(
    `<svg width="${width}" height="${height}" viewbox="0 0 ${width} ${height}" class="statechart">`
  );

  printArrowsEnd({ println })(markerId);

  printGroup<StateGraphEdge>({
    println,
    action: printArrows({
      println,
      position: (d: Position) => d,
      markerId,
    }),
  })(edges);

  const labelPosition = ({ x, y }: Position) => {
    return {
      x,
      y : y + transitionFontSize
    }
  };
  printGroup<StateGraphEdge>({
    println,
    action: printBox<StateGraphEdge>({
      position: labelPosition,
      size: (d: Dimensions) => d,
      println: (str: string) => println(`  ${str}`),
      className: () => "transition-background",
    }),
  })(edges);

  const printStateBox = printBox<StateGraphNode>({
    position: (d: StateGraphNode) => d,
    size: (d: StateGraphNode) => d,
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
        let { x, y } = d;
        const { width, height } = d;
        x += width / 2;
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
      position: labelPosition,
      size: (d: Dimensions) => d,
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
      position: (d: Position) => d,
      size: (d: Dimensions) => d,
      println: (str: string) => println(`  ${str}`),
      padding: (d) => getPadding(d.padding),
      label: (d) => d.state,
      fontSize: () => stateFontSize,
      className: () => "state-label",
    }),
  })(nodes);

  println("</svg>");
}
