import type { Dimensions, Position } from "../layout/index.ts";

export function printLabel<T>({
  println,
  label,
  size,
  position,
  padding,
  fontSize,
  className,
}: {
  println: (str: string) => void;
  label: (d: T) => string;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  padding: (d: T) => [number, number, number, number];
  fontSize: (d: T) => number;
  className: (d: T) => string;
}) {
  return (d: T) => {
    const { x, y } = position(d);
    const { width, height } = size(d);
    const [top, right, bottom, left] = padding(d);
    const text = label(d);
    const textSize = fontSize(d);
    const cls = className(d);
    println(
      `<text x="${Math.round(x + (left + width - right) / 2)}" y="${Math.round(
        y - height + (top + height - bottom) / 2 + textSize / 2
      )}" text-anchor="middle" class="${cls}">${text}</text>`
    );
  };
}
