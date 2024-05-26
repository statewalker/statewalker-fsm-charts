import type { Position, Dimensions } from "../layout/index.ts";
import { printBox } from "./printBox.ts";
import { printGroup } from "./printGroup.ts";

export function printBoxes<T extends Position & Dimensions>({
  println,
  ...options
}: {
  println: (str: string) => void;
  size: (d: T) => Dimensions;
  position: (d: T) => Position;
  style?: (d: T) => Record<string, string>;
  borderRadius?: (d: T) => number;
  className?: (d: T) => string;
}) {
  return printGroup<T>({
    println,
    action: printBox<T>({
      println: (str: string) => println(`  ${str}`),
      ...options,
    }),
  });
}
