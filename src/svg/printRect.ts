import type { Dimensions, Position } from "../layout/index.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";

export function printRect<T>({
  println,
  size,
  position,
  style,
  className = () => "",
  data,
  attrs,
}: {
  println: (str: string) => void;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  style?: (d: T) => Record<string, string>;
  data?: (d: T) => Record<string, string>;
  className?: (d: T) => string;
  attrs?: (d: T) => Record<string, string | number>;
}) {
  return (d: T) => {
    const { x, y } = position(d);
    const { width, height } = size(d);
    const serializedAttrs = serializeAttrs({
      rx: 5,
      ry: 5,
      ...(attrs ? attrs(d) : {}),
      class: className(d),
      x: Math.round(x),
      y: Math.round(y - height),
      width: Math.ceil(width),
      height: Math.ceil(height),
      style: style && serializeStyle(style(d)),
    });
    const rectData = data && data(d);
    const serializedData = serializeAttrs(rectData, "data-");
    println(`<rect ${serializedAttrs} ${serializedData}/>`);
  };
}
