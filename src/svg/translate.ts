import type { Dimensions, Position } from "../layout/index.ts";
import { getPadding } from "../utils/getPadding.ts";

export function translate<
  T extends Dimensions & Position & Record<string, any> = Dimensions &
    Position &
    Record<string, any>
>(dimensions: Dimensions, shift: Position = { x: 0, y: 0 }) {
  return {
    size: (d: T) => d,
    position: (d: T) => {
      return {
        x: Math.round(d.x + shift.x),
        y: Math.round(dimensions.height - (d.y + shift.y)),
      };
    },
    padding: (d: T) => getPadding(d.padding),
  };
}
