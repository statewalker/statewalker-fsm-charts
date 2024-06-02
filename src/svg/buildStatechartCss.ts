import { serializeCss } from "../utils/serializeCss";
import { buildStatechartStyles } from "./buildStatechartStyles";

export function buildStatechartCss({ prefix = "" } = {}): string {
  const cssObject = buildStatechartStyles({ root: prefix || ":root" });
  return serializeCss(cssObject);
}
