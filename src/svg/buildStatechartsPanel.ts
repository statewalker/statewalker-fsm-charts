import { buildStatechartSvg } from "./buildStatechartSvg.ts";
import type { StateChart } from "../layout/StateChart.ts";

export function buildStatechartsPanel({
  statechart,
  newId,
  println,
  initialStateKey = "<initial>",
  finalStateKey = "<final>",
}: {
  statechart: StateChart;
  newId: (prefix: string) => string;
  println: (str: string) => void;
  initialStateKey?: string;
  finalStateKey?: string;
}) : void {
  render(statechart, println);

  function render(statechart: StateChart, println: (str: string) => void) {
    println(`  <details class="state-details" data-state-id="${statechart.id}">`);
    println(`    <summary class="state-details__label">${statechart.key}</summary>`);
    println(`    <div class="state-details__description"><div class="state-details__chart">`);
    const printChildren = (str: string) => println(`    ${str}`);
    buildStatechartSvg({
      graph: statechart.graph,
      newId,
      println: printChildren,
      initialStateKey,
      finalStateKey,
    });
    println(`    </div>`);
    for (const child of statechart.children || []) {
      render(child, printChildren);
    }
    println(`    </div>`);
    println(`  </details>`);
  }
}
