import type { Dimensions, Position, Padding } from "../layout/index.ts";
import { getPadding } from "../utils/getPadding.ts";

export function translateBox<T>(
  {
    position,
    padding,
    size,
  }: {
    size: (d: T) => Dimensions;
    position: (d: T) => Position;
    padding: (d: T) => [number, number, number, number];
  },
  shift: Padding
) {
  const [top, right, bottom, left] = getPadding(shift);
  return {
    padding,
    position: (d: T) => {
      const { x, y } = position(d);
      return {
        x: Math.round(x + left),
        y: Math.round(y - bottom),
      };
    },
    size: (d: T) => {
      const { width, height } = size(d);
      return {
        width: Math.round(width - (left + right)),
        height: Math.round(height - (top + bottom)),
      };
    },
  };
}
