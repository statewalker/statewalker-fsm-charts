import * as d3 from "d3-shape";
import type { Position, StateGraphEdge } from "../layout/index.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";

export function printArrows<T>({
  println,
  markerId,
  position,
}: {
  println: (str: string) => void;
  markerId: string;
  position: (d: T) => Position;
}) {
  return ({ points }: StateGraphEdge, i: number) => {
    if (i === 0) {
      println(
        `<defs>
        <marker id="${markerId}" class="transition-marker" refX="19" refY="7" markerWidth="20" markerHeight="14" markerUnits="strokeWidth" orient="auto">
          <path d="M 19,7 L9,13 L14,7 L9,1 Z"></path>
        </marker>
      </defs>`
      );
    }
    const coords = d3
      .line(points)
      .x((d: T) => position(d).x)
      .y((d: T) => position(d).y)
      .curve(d3.curveBasis);
    // .curve(d3.curveLinear)
    const pathStyle = serializeStyle({
      fill: "none",
    });
    println(
      `<path class="transition-line" d="${coords(
        points
      )}" style="${pathStyle}" marker-end="url(#${markerId})" />`
    );
  };
}
