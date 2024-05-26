import type { Dimensions, Position } from "../layout/index.ts";
import { serializeStyle } from "../utils/serializeStyle.ts";

export function printBox<T>({
  println, size, position, style, borderRadius = () => 0, className = () => "",
}: {
  println: (str: string) => void;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  style?: (d: T) => Record<string, string>;
  borderRadius?: (d: T) => number;
  className?: (d: T) => string;
}) {
  return (d: T) => {
    const { x, y } = position(d);
    const { width, height } = size(d);
    const rectStyle = style ? serializeStyle(style(d)) : "";
    const radius = borderRadius(d);
    const cls = className(d);
    println(
      `<rect class="${cls}" x="${Math.round(x)}" y="${Math.round(
        y - height
      )}" width="${Math.ceil(width)}" height="${Math.ceil(
        height
      )}" style="${rectStyle}" rx="${radius}" ry="${radius}"/>`
    );
  };
}
