import type { Dimensions, Position } from "../layout/index.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";

export function printRect<T>({
  println,
  size,
  position,
  style,
  borderRadius = () => 0,
  className = () => "",
  data,
}: {
  println: (str: string) => void;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  style?: (d: T) => Record<string, string>;
  data?: (d: T) => Record<string, string>;
  borderRadius?: (d: T) => number;
  className?: (d: T) => string;
}) {
  return (d: T) => {
    const { x, y } = position(d);
    const { width, height } = size(d);
    const radius = borderRadius(d);
    const serializedAttrs = serializeAttrs({
      class: className(d),
      x: Math.round(x),
      y: Math.round(y - height),
      width: Math.ceil(width),
      height: Math.ceil(height),
      style: style && serializeStyle(style(d)),
      rx: radius > 0 ? radius : undefined,
      ry: radius > 0 ? radius : undefined,
    });
    const rectData = data && data(d);
    const serializedData = serializeAttrs(rectData, "data-");
    println(`<rect ${serializedAttrs} ${serializedData}/>`);
  };
}
