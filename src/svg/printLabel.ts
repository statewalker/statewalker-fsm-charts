import type { Dimensions, Position } from "../layout/index.ts";
import { serializeAttrs } from "../utils/serializeAttrs.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";

export function printLabel<T>({
  println,
  label,
  size,
  position,
  padding,
  fontSize,
  className,
  data,
  style,
  attrs
}: {
  println: (str: string) => void;
  label: (d: T) => string;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  padding: (d: T) => [number, number, number, number];
  fontSize: (d: T) => number;
  className: (d: T) => string;
  style?: (d: T) => Record<string, string>;
  data?: (d: T) => Record<string, string>;
  attrs?: (d: T) => Record<string, string | number>;
}) {
  return (d: T) => {
    const { x, y } = position(d);
    const { width, height } = size(d);
    const [top, right, bottom, left] = padding(d);
    const text = label(d);
    if (!text) return;
    const textSize = fontSize(d);

    const serializedAttrs = serializeAttrs({
      class: className(d),
      "text-anchor": "middle",
      ...(attrs ? attrs(d) : {}),
      x: Math.round(x + (left + width - right) / 2),
      y: Math.round(y - height + (top + height - bottom) / 2 + textSize / 2),
      style: style && serializeStyle(style(d)),
    });
    const textData = data && data(d);
    const serializedData = serializeAttrs(textData, "data-");

    println(`<text ${serializedAttrs} ${serializedData}>${text}</text>`);
  };
}
