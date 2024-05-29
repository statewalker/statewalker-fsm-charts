import type {
  TransitionsGraph,
  StateGraphNode,
  StateGraphEdge,
  Position,
} from "../layout/index.ts";
import { getPadding } from "../utils/getPadding.ts";
import { printGroup } from "./printGroup.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";
import { BasisCurve } from "../utils/BasisCurve.ts";

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
  {
    const serializedAttrs = serializeAttrs({
      refX: 19,
      refY: 7,
      markerWidth: 20,
      markerHeight: 14,
      orient: "auto",
      class: "transition-marker",
      id: markerId,
      stroke: "none",
      fill: "currentColor",
    });
    println(`  <defs>`);
    println(`    <marker ${serializedAttrs}>`);
    println(`      <path d="M 19,7 L9,13 L14,7 L9,1 Z"></path>`);
    println(`    </marker>`);
    println(`  </defs>`);
  }
  /*
  .transition-line {
    stroke: var(--transition-line--stroke, silver);
    strokeWidth: var(--transition-line--stroke-width, 1px);
  }
   */
  printGroup<StateGraphEdge>({
    println,
    action: (d) => {
      const { points } = d;
      const path: string[] = [];
      const round = (...n: number[]) => n.map(Math.round);
      const base = new BasisCurve({
        bezierCurveTo(
          x0: number,
          y0: number,
          x1: number,
          y1: number,
          x2: number,
          y2: number
        ) {
          path.push("C" + round(x0, y0, x1, y1, x2, y2).join(","));
        },
        moveTo(x: number, y: number) {
          path.push("M" + round(x, y).join(","));
        },
        lineTo(x: number, y: number) {
          path.push("L" + round(x, y).join(","));
        },
        closePath() {
          path.push("Z");
        },
      });
      base.lineStart();
      for (const point of points) {
        base.point(point.x, point.y);
      }
      base.lineEnd();
      const serializedAttrs = serializeAttrs({
        class: "transition-line",
        "transition-id": d.id,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1px",
        d: path.join(""),
        "marker-end": `url(#${markerId})`,
      });
      println(`  <path ${serializedAttrs} />`);
    },
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
    action: ({ x, y, width, height, id }) => {
      const serializedAttrs = serializeAttrs({
        x: Math.round(x),
        y: Math.round(y - height),
        width: Math.ceil(width),
        height: Math.ceil(height),
        rx: Math.ceil(transitionFontSize / 2),
        ry: Math.ceil(transitionFontSize / 2),
        fill: "rgba(255,255,255,0.7)",
        stroke: "none",
        strokeWidth: "1",
        class: "transition-box",
        "data-transition-id": id,
      });
      println(`<rect ${serializedAttrs} />`);
    },
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
  printGroup<StateGraphNode>({
    println,
    action: ({ key, x, y, width, height, id }) => {
      if (key === initialStateKey || key === finalStateKey) return;
      const serializedAttrs = serializeAttrs({
        x: x + shift,
        y: y - height + shift,
        width: Math.ceil(width - 2 * shift),
        height: Math.ceil(height - 2 * shift),
        rx: Math.ceil(stateFontSize / 2),
        ry: Math.ceil(stateFontSize / 2),
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        class: "state-box",
        "data-state-id": id,
      });
      println(`<rect ${serializedAttrs} />`);
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
    action: ({ key, id, x, y, width, height }) => {
      if (key !== initialStateKey && key !== finalStateKey) return;
      const cx = Math.round(x + width / 2);
      const cy = Math.round(y - height / 2);
      if (key === initialStateKey) {
        const serializedAttrs = serializeAttrs({
          class: "state-initial",
          cx,
          cy,
          r: initialStateRadius,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          "data-state-id": id,
        });
        println(`  <circle ${serializedAttrs} />`);
      } else {
        let serializedAttrs = serializeAttrs({
          class: "state-final",
          cx,
          cy,
          r: initialStateRadius,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          "data-state-id": id,
        });
        println(`  <circle ${serializedAttrs} />`);

        serializedAttrs = serializeAttrs({
          class: "state-final inner",
          cx,
          cy,
          r: finalStateRadius,
          fill: "currentColor",
          stroke: "none",
          strokeWidth: 0,
          "data-state-id": id,
        });
        println(`  <circle ${serializedAttrs} />`);
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
    action: ({ id, x, y, width, height, padding, event: text }) => {
      if (!text) return;
      const textSize = transitionFontSize;
      const [top, right, bottom, left] = getPadding(padding);
      const serializedAttrs = serializeAttrs({
        class: "transition-label",
        "text-anchor": "middle",
        fill: "currentColor",
        x: Math.round(x + (left + width - right) / 2),
        y: Math.round(y - height - bottom - top + textSize / 2),
        "data-transition-id": id,
      });
      println(`<text ${serializedAttrs}>${text}</text>`);
    },
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
    action: ({ id, x, y, width, height, padding, state: text }) => {
      if (!text) return;
      const textSize = stateFontSize;
      const [top, right, bottom, left] = getPadding(padding);
      const serializedAttrs = serializeAttrs({
        class: "state-label",
        "text-anchor": "middle",
        fill: "currentColor",
        x: Math.round(x + (left + width - right) / 2),
        y: Math.round(
          y - height + (top + height - bottom) / 2 + textSize / 2 - shift
        ),
        "data-state-id": id,
      });
      println(`<text ${serializedAttrs}>${text}</text>`);
    },
  })(nodes);

  println("</svg>");
}
