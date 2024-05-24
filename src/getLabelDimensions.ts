import { Dimensions } from "./Dimensions.ts";
import { getPadding } from "./getPadding.ts";
import { Padding } from "./Padding.ts";


export function getLabelDimensions(
  label: string,
  {
    padding = 0, fontSize = 14, getCharWidth = () => fontSize, lineHeight = fontSize * 1.2,
  }: {
    padding?: Padding;
    fontSize?: number;
    getCharWidth?: (char: string) => number;
    lineHeight?: number;
  } = {}
) {
  const lines = label.split("\n");
  let dimensions: Dimensions = { width: 0, height: 0 };
  for (const line of lines) {
    dimensions = expandBox(
      dimensions,
      getLineDimensions({
        line,
        lineHeight,
        fontSize,
        getCharWidth,
      })
    );
  }
  const [top, right, bottom, left] = getPadding(padding);
  return {
    width: dimensions.width + left + right,
    height: dimensions.height + top + bottom,
  };
  function expandBox(dim1: Dimensions, dim2: Dimensions) {
    return {
      width: Math.max(dim1.width, dim2.width),
      height: dim1.height + dim2.height,
    };
  }

  function getLineDimensions({
    line, fontSize = 14, getCharWidth = () => fontSize, lineHeight = fontSize * 1.2,
  }: {
    line: string;
    fontSize?: number;
    getCharWidth?: (char: string[1]) => number;
    lineHeight?: number;
  }) {
    return {
      width: line.split("").reduce((w, c) => (w += getCharWidth(c)), 0),
      height: lineHeight | (fontSize * 1.2) | (14 * 1.2),
    };
  }
}
