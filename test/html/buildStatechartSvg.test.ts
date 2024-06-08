import * as lodash from "lodash-es";
import {
  buildFlatCharts,
  getGraphParamsProvider,
} from "../../src/layout/index.ts";
import { describe, it, expect } from "../deps.ts";
import { process } from "../data/process.checkout.ts";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { buildStatechartSvg, buildStatechartCss } from "../../src/html/index.ts";
import fs from "fs/promises";

describe("buildStatechartSvg", () => {
  it("should generate transitions graph", async () => {
    const controlFileName = join(
      __dirname,
      "./buildStatechartSvg.control.html"
    );

    let control = "";
    try {
      control = await fs.readFile(controlFileName, "utf-8");
    } catch (error) {
      control = "";
    }
    const transitions = process.transitions;
    let idCounter = 0;
    const newId = (prefix: string) => `${prefix}_${idCounter++}`;
    const { getStateParams, getTransitionParams } = getGraphParamsProvider({
      // fontSize: 14,
      stateFontSize: 14,
      stateTextPadding: [14, 7],
      transitionsFontSize: 12,
      transitionsTextPadding: 6,
    });

    const result = buildFlatCharts({
      lodash,
      transitions,
      newId,
      getStateParams,
      getTransitionParams,
      vertical: false,
      padding: [15, 15],
    });
    const lines: string[] = [];
    buildStatechartSvg({
      graph: result,
      newId,
      println: (str: string) => lines.push(str),
    });
    const svg = lines.join("\n");
    let prefix = "";
    const css = buildStatechartCss({ prefix });
    const html = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<div style="max-width: 100%; overflow: auto" class="state-details">
  <style>
  ${css}
  .state-details .statechart .states .state:hover
  {
    --state--stroke-color: blue;
    --state--stroke-width: 3;
    --state-initial--stroke-color: var(--state--stroke-color, silver);
    --state-initial--stroke-width: var(--state--stroke-width, 2);
    --state-final--stroke-color: var(--state--stroke-color, silver);
    --state-final--stroke-width: var(--state--stroke-width, 2);
    --state-label--color: navy;
    cursor: pointer;
  }
  .state-details .transitions .transition:hover {
    --transition-line--stroke-color: red;
    --transition-marker--fill: var(--transition-line--stroke-color, gray);
    --transition-label--color: maroon;
    cursor: pointer;
  }
</style>
${svg}
</div>
</body>
</html>`;
    try {
      expect(html).toEqual(control);
    } catch (error) {
      await fs.writeFile(controlFileName, html, "utf-8");
      throw error;
    }
  });
});
