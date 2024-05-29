import { serializeAttrs } from "../utils/serializeAttrs";
import { serializeStyle } from "../utils/serializeStyle";

export function printArrowsEnd<T = void>({
  println,
  markerId,
  className,
  style,
}: {
  println: (str: string) => void;
  markerId: (d: T) => string;
  className: (d: T) => string;
  style?: (d: T) => Record<string, string>;
}) {
  return (d: T) => {
    const cls = className(d);
    const serializedAttrs = serializeAttrs({
      class: cls,
      id: markerId(d),
      stroke: "none",
      style: style && serializeStyle(style(d)),
    });
    println(`  <defs>`);
    println(
      `    <marker ${serializedAttrs} refX="19" refY="7" markerWidth="20" markerHeight="14" orient="auto" >`
    );
    println(`      <path d="M 19,7 L9,13 L14,7 L9,1 Z"></path>`);
    println(`    </marker>`);
    println(`  </defs>`);
  };
}
