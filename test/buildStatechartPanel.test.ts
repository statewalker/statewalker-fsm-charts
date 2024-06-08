import { describe, it, expect } from "./deps.ts";
import { process } from "./data/process.checkout.ts";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { buildStatechartCss, serializeCss } from "../src/index.ts";
import fs from "fs/promises";
import { toStatechartsPanels } from "./toStatechartsPanels.ts";

// buildStatechartsPanel
describe("buildStatechartsPanel", () => {
  it("should generate transitions graph", async () => {
    const controlFileName = join(
      __dirname,
      "./buildStatechartPanel.control.html"
    );

    let control = "";
    try {
      control = await fs.readFile(controlFileName, "utf-8");
    } catch (error) {
      control = "";
    }

    const { html } = toStatechartsPanels(process);
    let prefix = ".main";
    const css = buildStatechartCss({ prefix });
    const selectionStyles = {
      [prefix]: {
        ".states": {
          ".state:hover": {
            "--state--stroke-color": "blue",
            "--state--stroke-width": "3px",
            "--state-initial--stroke-color":
              "var(--state--stroke-color, silver)",
            "--state-initial--stroke-width": "var(--state--stroke-width, 2px)",
            "--state-final--stroke-color": "var(--state--stroke-color, silver)",
            "--state-final--stroke-width": "var(--state--stroke-width, 2px)",
            "--state-label--color": "navy",
            cursor: "pointer",
          },
        },
        ".transitions": {
          ".transition:hover": {
            "--transition-line--stroke-color": "red",
            "--transition-marker--fill":
              "var(--transition-line--stroke-color, gray)",
            "--transition-label--color": "maroon",
            cursor: "pointer",
          },
        },
      },
    };
    const result = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<div class="main" style="max-width: 500px;">
  <style>
  ${css}
  ${serializeCss(selectionStyles)}
</style>
${html}
</div>
</body>
</html>`;
    try {
      expect(result).toEqual(control);
    } catch (error) {
      await fs.writeFile(controlFileName, result, "utf-8");
      throw error;
    }
  });
});
