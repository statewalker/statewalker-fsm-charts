import { describe, it, expect } from "../deps.ts";
import { process } from "../data/process.checkout.ts";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

import { buildStatechartCss } from "../../src/html/index.ts";
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
    const result = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<div class="main" style="max-width: 500px;">
<style>
${css}
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
