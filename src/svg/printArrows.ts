import type { Position, StateGraphEdge } from "../layout/index.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";
import { BasisCurve } from "../utils/BasisCurve.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";

export function printArrows<T extends { points: Position[] }>({
  println,
  markerId,
  data,
  className,
  style,
}: {
  println: (str: string) => void;
  markerId: string;
  data?: (d: T) => Record<string, string>;
  className: (d: T) => string;
  style?: (d: T) => Record<string, string>;
}) {
  return (d: T) => {
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

    const cls = className(d);
    const serializedAttrs = serializeAttrs({
      // class: cls,
      d: path.join(""),
      markerEnd: `url(#${markerId})`,
      fill : "none",
      stroke : `var(--${cls}-stroke, silver)`,
      strokeWidth : `var(--${cls}-stroke-width, 1)`,
      style: style && serializeStyle(style(d)),
    });
    const rectData = data && data(d);
    const serializedData = serializeAttrs(rectData, "data-");
    println(`  <path ${serializedAttrs} ${serializedData}/>`);
  };
}
