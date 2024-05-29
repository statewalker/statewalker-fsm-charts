import * as lodash from "lodash-es";
import {
  type TransitionsGraph,
  type Transition,
  buildFlatCharts,
  getGraphParamsProvider,
} from "../src/layout/index.ts";
import { describe, it, expect } from "./deps.ts";
// import { transitions } from "./data/process.subscription.ts";
import { process } from "./data/process.checkout.ts";

// import { position } from "../src/dagre/position/index";
import { buildSvg } from "../src/svg/generateSvg.ts";
import fs from "fs/promises";
import { generateCss } from "../src/index.ts";

describe("buildFlatSvgCharts", () => {
  function testCharts(
    message: string,
    transitions: Transition[],
    expected: TransitionsGraph
  ) {
    it(message, async () => {
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

      // console.log(JSON.stringify(result, null, 2));
      try {
        const lines: string[] = [];
        buildSvg({
          graph: result,
          newId,
          println: (str: string) => lines.push(str),
        });
        const svg = lines.join("\n");
        const css = generateCss();
        // const css = "";
        await fs.writeFile(
          "./index.html",
          `
        <!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
            <div style="max-width: 100%; overflow: auto">
              <style>${css}</style>
              ${svg}
            </div>
          </body>
        </html>`
        );

        // expect(result).toEqual(expected);
      } catch (err) {
        console.log("RESULT", JSON.stringify(result, null, 2));
        throw err;
      }
    });
  }

  testCharts("should generate empty graph", process.transitions, {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    nodes: [],
    edges: [],
  });
});
