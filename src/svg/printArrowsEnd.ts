export function printArrowsEnd({
  println,
}: {
  println: (str: string) => void;
}) {
  return (markerId: string) => {
    println(`  <defs>`);
    println(
      `    <marker id="${markerId}" class="transition-marker" refX="19" refY="7" markerWidth="20" markerHeight="14" markerUnits="strokeWidth" orient="auto">`
    );
    println(`      <path d="M 19,7 L9,13 L14,7 L9,1 Z"></path>`);
    println(`    </marker>`);
    println(`  </defs>`);
  };
}
