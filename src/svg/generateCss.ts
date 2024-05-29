import { serializeStyle } from "../utils/serializeStyle";

export function generateCss() {
  return serializeStyle({
    "--state--fill": "none",
    "--state--stroke-color": "silver",
    "--state--stroke-width": "2",

    "--state-initial--fill": "var(--state--fill, none)",
    "--state-initial--stroke": "var(--state--stroke-color, silver)",
    "--state-initial--stroke-width": "var(--state--stroke-width, 2)",

    "--state-final--fill": "var(--state--fill, none)",
    "--state-final--stroke": "var(--state--stroke-color, silver)",
    "--state-final--stroke-width": "var(--state--stroke-width, 2)",

    "--state-label--color": "gray",
    "--state-label--font-size": "14",
    "--state-label--font-family": "sans-serif",

    "--transition--fill": "rgba(255,255,255,0.7)",
    "--transition--stroke": "none",
    "--transition--stroke-width": "1",

    "--transition-line--stroke": "silver",
    "--transition-line--stroke-width": "1px",

    "--transition-label--color": "gray",
    "--transition-label--font-size": "12",
    "--transition-label--font-family": "sans-serif",

    "--transition-marker--fill": "var(--transition-line--stroke, gray)",
  });
}
