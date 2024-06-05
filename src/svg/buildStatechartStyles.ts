import { CssTree } from "../utils/serializeCss";

function buildStateDetailsStyle() {
  return {
    ".state-details": {
      backgroundColor: "var(--state-background-color, white)",
      border:
        "var(--state-border-width, 1px) solid var(--state-border-color, currentColor)",
      borderRadius: "0.5em",
      padding: "0.5em",
    },
    ".state-details__label": {
      cursor: "pointer",
      color: "var(--transition-label-color, currentColor)",
      fontFamily: "var(--state-label-font-family, sans-serif)",
      fontSize: "var(--state-label-font-size, 14px)",
    },
    ".state-details__description": {
      display: "flex",
      flexDirection: "column",
      gap: "0.5em",
    },
    ".state-details__chart": {
      maxWidth: "100%",
      overflow: "auto",
      scrollbarWidth: "thin",
    },
    //
    ".state-details--selected": {
      backgroundColor: "var(--state-selected-background-color, white)",
      border:
        "var(--state-selected-border-width, 1px) solid var(--state-selected-border-color, currentColor)",
    },
    ".state-details__label--selected": {
      color: "var(--state-selected-label-color)",
    },
  };
}
export function buildStatechartStyles({
  root = ":root",
}: { root?: string } = {}): CssTree {
  return {
    [root]: {
      // --------------------------------------
      // Normal states
      "--state-background-color": "white",
      "--state-border-color": "silver",
      "--state-border-width": "1px",
      "--state-label-color": "gray",
      "--state-label-font-size": "14px",
      "--state-label-font-family": "sans-serif",

      // Selected states
      "--state-selected-background-color": "#eee",
      "--state-selected-border-color": "red",
      "--state-selected-border-width": "2px",
      "--state-selected-label-color": "red",

      // --------------------------------------
      // Normal transitions
      "--transition-background-color": "rgba(255,255,255,0.7)",
      "--transition-border-color": "none",
      "--transition-border-width": "1px",
      "--transition-line-color": "silver",
      "--transition-line-width": "1px",
      "--transition-label-color": "gray",
      "--transition-label-font-size": "12px",
      "--transition-label-font-family": "sans-serif",

      // --------------------------------------
      // Selected transitions
      "--transition-selected-background-color": "#eee",
      "--transition-selected-border-color": "none",
      "--transition-selected-border-width": "0",
      "--transition-selected-line-color": "red",
      "--transition-selected-line-width": "1px",
      "--transition-selected-label-color": "red",

      // --------------------------------------
      // --------------------------------------
      ...buildStateDetailsStyle(),
      ".transition": {},
      ".transition--selected": {
        "--transition-background-color":
          "var(--transition-selected-background-color)",
        "--transition-border-color": "var(--transition-selected-border-color)",
        "--transition-border-width": "var(--transition-selected-border-width)",
        "--transition-line-color": "var(--transition-selected-line-color)",
        "--transition-line-width": "var(--transition-selected-line-width)",
        "--transition-label-color": "var(--transition-selected-label-color)",
      },
      ".transition__marker": {
        fill: "var(--transition-line-color, currentColor)",
        stroke: "none",
      },
      ".transition__line": {
        stroke: "var(--transition-line-color, currentColor)",
        strokeWidth: "var(--transition-line-width, 1px)",
      },
      ".transition__box": {
        fill: "var(--transition-background-color, rgba(255,255,255,0.7))",
        stroke: "var(--transition-border-color, none)",
        strokeWidth: "var(--transition-border-width, 1px)",
        borderRadius: "0.5em",
        cursor: "pointer",
      },
      ".transition__label": {
        fill: "var(--transition-label-color, currentColor)",
        fontSize: "var(--transition-label-font-size, 12px)",
        fontFamily: "var(--transition-label-font-family, sans-serif)",
        cursor: "pointer",
      },

      // ----------------------------------------------
      // States

      ".state": {},
      ".state--selected": {
        "--state-background-color": "var(--state-selected-background-color)",
        "--state-border-color": "var(--state-selected-border-color)",
        "--state-border-width": "var(--state-selected-border-width)",
        "--state-label-color": "var(--state-selected-label-color)",
      },

      // --------------------------
      // Panels
      ".state__details": {
        backgroundColor: "var(--state-background-color, white)",
        border:
          "var(--state-border-width, 1px) solid var(--state-border-color, currentColor)",
        borderRadius: "0.5em",
        padding: "0.5em",
      },
      ".state__description": {
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
      },
      ".state__chart-container": {
        maxWidth: "100%",
        overflow: "auto",
        scrollbarWidth: "thin",
      },

      // --------------------------
      // Statecharts
      ".state__box": {
        fill: "var(--state-background-color, white)",
        stroke: "var(--state-border-color, currentColor)",
        strokeWidth: "var(--state-border-width, 1px)",
        borderRadius: "0.5em",
        cursor: "pointer",
      },
      ".state__label": {
        color: "var(--state-label-color, currentColor)",
        fill: "var(--state-label-color, currentColor)",
        fontSize: "var(--state-label-font-size, 14px)",
        fontFamily: "var(--state-label-font-family, sans-serif)",
        cursor: "pointer",
      },
      ".state__initial": {
        fill: "var(--state-border-color, currentColor)",
        stroke: "var(--state-border-color, currentColor)",
        strokeWidth: "var(--state-border-width, 2px)",
      },
      ".state__final": {
        fill: "white",
        stroke: "var(--state-border-color, currentColor)",
        strokeWidth: "var(--state-border-width, 2px)",
        // ---------------------------
        "&.state__final--inner": {
          fill: "var(--state-border-color, currentColor)",
          stroke: "none",
          strokeWidth: "0",
        },
      },
    },
  };
}
