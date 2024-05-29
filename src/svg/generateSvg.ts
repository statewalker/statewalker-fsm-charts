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
import { printRect } from "./printRect.ts";
import { printGroup } from "./printGroup.ts";
import { printLabel } from "./printLabel.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";

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
  const markerId = newId("marker");

  width = Math.ceil(width);
  height = Math.ceil(height);
  println(
    `<svg ${serializeAttrs({
      class: "statechart",
      width,
      height,
      viewbox: `0 0 ${width} ${height}`,
      xmlns: "http://www.w3.org/2000/svg",
    })}>`
  );

  // printStyles({ println })();

  /* 
  .transition-marker {
    fill : var(--transition-marker--fill, var(--transition-line--stroke, silver));
  }
  */
  printArrowsEnd({
    markerId: () => markerId,
    println,
    className: () => "transition-marker",
    attrs: () => ({
      fill: "currentColor",
      stroke: "none",
    }),
  })();
  /*
  .transition-line {
    stroke: var(--transition-line--stroke, silver);
    strokeWidth: var(--transition-line--stroke-width, 1px);
  }
   */
  printGroup<StateGraphEdge>({
    println,
    action: printArrows({
      println,
      markerId,
      className: () => "transition-line",
      data: (d) => ({
        transitionId: d.id,
      }),
      attrs: () => ({
        stroke: "currentColor",
        strokeWidth: "1px",
      }),
    }),
  })(edges);

  /*
  .transition-box {
    fill: var(--transition--fill, rgba(255,255,255,0.7));
    stroke: var(--transition--stroke, none);
    strokeWidth: var(--transition--stroke-width, 1);
    rx: 0.5em;
    ry: 0.5em;
  }
  */
  const labelPosition = ({ x, y }: Position) => {
    return {
      x,
      y: Math.round(y - 1.5 * transitionFontSize),
    };
  };
  printGroup<StateGraphEdge>({
    println,
    action: printRect<StateGraphEdge>({
      position: labelPosition,
      size: (d: Dimensions) => d,
      println: (str: string) => println(`  ${str}`),
      className: () => "transition-box",
      attrs: () => ({
        fill: "rgba(255,255,255,0.7)",
        stroke: "none",
        strokeWidth: "1",
        rx: "0.5em",
        ry: "0.5em",
      }),
      data: (d) => ({
        transitionId: d.id,
      }),
    }),
  })(edges);

  const shift = 3;
  /*
  .state-box {
    fill: var(--state--fill, none);
    stroke: var(--state--stroke-color, silver);
    strokeWidth: var(--state--stroke-width, 2);
    rx: 0.5em;
    ry: 0.5em;
  }
  */
  const printStateBox = printRect<StateGraphNode>({
    position: ({ x, y }: Position) => ({
      x: x + shift,
      y: y - shift,
    }),
    size: ({ width, height }: Dimensions) => ({
      width: Math.ceil(width - 2 * shift),
      height: Math.ceil(height - 2 * shift),
    }),
    attrs: () => ({
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      rx: Math.ceil(stateFontSize / 2),
      ry: Math.ceil(stateFontSize / 2),
    }),
    println: (str: string) => println(`  ${str}`),
    className: () => "state-box",
    data: (d) => ({
      stateId: d.id,
    }),
  });
  printGroup<StateGraphNode>({
    println,
    action: (d: StateGraphNode) => {
      if (d.key !== initialStateKey && d.key !== finalStateKey) {
        printStateBox(d);
      }
    },
  })(nodes);

  /*
  .state-initial {
    fill: var(--state-initial--fill, var(--state--fill, none));
    stroke: var(--state-initial--stroke, var(--state--stroke-color, silver));
    strokeWidth: var(--state-initial--stroke-width, var(--state--stroke-width, 2));
  }
  .state-final {
    fill: var(--state-final--fill, var(--state--fill, none));
    stroke: var(--state-final--stroke, var(--state--stroke-color, silver));
    strokeWidth: var(--state-final--stroke-width, var(--state--stroke-width, 2));
  }
  .state-final.inner {
    fill: var(--state-final--stroke, var(--state--stroke-color, silver));
    stroke: none;
    strokeWidth: 0;
  }
  */

  // Symbols for initial and final states
  const initialStateRadius = 6;
  const finalStateRadius = initialStateRadius / 2;
  printGroup<StateGraphNode>({
    println,
    action: (d: StateGraphNode) => {
      if (d.key === initialStateKey || d.key === finalStateKey) {
        const { x, y, width, height } = d;
        const cx = Math.round(x + width / 2);
        const cy = Math.round(y - height / 2);
        const serializedData = serializeAttrs(
          {
            stateId: d.id,
          },
          "data-"
        );
        if (d.key === initialStateKey) {
          const serializedAttrs = serializeAttrs({
            class: "state-initial",
            cx,
            cy,
            r: initialStateRadius,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
          });
          println(`  <circle ${serializedAttrs} ${serializedData} />`);
        } else {
          let serializedAttrs = serializeAttrs({
            class: "state-final",
            cx,
            cy,
            r: initialStateRadius,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 2,
          });
          println(`  <circle ${serializedAttrs} ${serializedData} />`);

          serializedAttrs = serializeAttrs({
            class: "state-final inner",
            cx,
            cy,
            r: finalStateRadius,
            fill: "currentColor",
            stroke: "none",
            strokeWidth: 0,
          });
          println(`  <circle ${serializedAttrs} ${serializedData} />`);
        }
      }
    },
  })(nodes);

  /*
  .transition-label {
    fill: var(--transition-label--color, gray);
    font-size: var(--transition-label--font-size, 12px);
    font-family: var(--transition-label--font-family, sans-serif);
  }
  */
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
      data: (d) => ({
        transitionId: d.id,
      }),
      attrs: () => ({
        fill: "currentColor",
      }),
    }),
  })(edges);

  /*
  .state-label {
    fill: var(--state-label--color, gray);
    font-size: var(--state-label--font-size, 14px);
    font-family: var(--state-label--font-family, sans-serif);
  }
  */
  printGroup<StateGraphNode>({
    println,
    action: printLabel<StateGraphNode>({
      position: ({ x, y }: Position) => ({
        x: x,
        y: y - shift,
      }),
      size: (d: Dimensions) => d,
      println: (str: string) => println(`  ${str}`),
      padding: (d) => getPadding(d.padding),
      label: (d) => d.state,
      fontSize: () => stateFontSize,
      className: () => "state-label",
      attrs: () => ({
        fill: "currentColor",
      }),
      data: (d) => ({
        stateId: d.id,
      }),
    }),
  })(nodes);

  println("</svg>");
}
