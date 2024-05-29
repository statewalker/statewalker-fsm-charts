import { toKebabCase } from "./toKebabCase.ts";

export function serializeStyle(
  style: Record<string, string>,
  separator = "; "
) {
  const str = Object.entries(style)
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join(separator);
  return str ? str + separator : "";
}
