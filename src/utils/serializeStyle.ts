import { toKebabCase } from "./toKebabCase.ts";

export function serializeStyle(style: Record<string, string>) {
  return Object.entries(style)
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join(";");
}
