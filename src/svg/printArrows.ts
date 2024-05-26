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
  return ({ points }: StateGraphEdge) => {
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
      `  <path class="transition-line" d="${coords(
        points
      )}" style="${pathStyle}" marker-end="url(#${markerId})" />`
    );
  };
}
