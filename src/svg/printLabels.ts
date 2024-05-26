import type { Dimensions, Position } from "../layout/index.ts";
import { printGroup } from "./printGroup.ts";
import { printLabel } from "./printLabel.ts";

export function printLabels<T>({
  println,
  ...options
}: {
  println: (str: string) => void;
  label: (d: T) => string;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  padding: (d: T) => [number, number, number, number];
  fontSize: (d: T) => number;
  className: (d: T) => string;
}) {
  return printGroup<T>({
    println,
    action: printLabel({
      println: (str: string) => println(`  ${str}`),
      ...options,
    }),
  });
}
