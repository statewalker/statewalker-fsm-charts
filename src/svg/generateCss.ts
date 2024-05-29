export function generateCss({ prefix = "" } = {}) {
  return `
  ${prefix}.statechart {
    --state--fill: none;
    --state--stroke-color: silver;
    --state--stroke-width: 2;

    --state-initial--fill: var(--state--fill, none);
    --state-initial--stroke: var(--state--stroke-color, silver);
    --state-initial--stroke-width: var(--state--stroke-width, 2);

    --state-final--fill: var(--state--fill, none);
    --state-final--stroke: var(--state--stroke-color, silver);
    --state-final--stroke-width: var(--state--stroke-width, 2);

    --state-label--color: gray;
    --state-label--font-size: 14px;
    --state-label--font-family: sans-serif;

    --transition--fill: rgba(255,255,255,0.7);
    --transition--stroke: none;
    --transition--stroke-width: 1;

    --transition-line--stroke: silver;
    --transition-line--stroke-width: 1px;

    --transition-label--color: gray;
    --transition-label--font-size: 12px;
    --transition-label--font-family: sans-serif;

    --transition-marker--fill: var(--transition-line--stroke, gray);
  }
  
  ${prefix}.statechart .transition-marker {
    fill : var(--transition-marker--fill, var(--transition-line--stroke, silver));
  }

  ${prefix}.statechart .transition-line {
    stroke: var(--transition-line--stroke, silver);
    strokeWidth: var(--transition-line--stroke-width, 1px);
  }

  ${prefix}.statechart .transition-box {
    fill: var(--transition--fill, rgba(255,255,255,0.7));
    stroke: var(--transition--stroke, none);
    strokeWidth: var(--transition--stroke-width, 1);
    rx: 0.5em;
    ry: 0.5em;
  }

  ${prefix}.statechart .state-box {
    fill: var(--state--fill, none);
    stroke: var(--state--stroke-color, silver);
    strokeWidth: var(--state--stroke-width, 2);
    rx: 0.5em;
    ry: 0.5em;
  }

  ${prefix}.statechart .state-initial {
    fill: var(--state-initial--fill, var(--state--fill, none));
    stroke: var(--state-initial--stroke, var(--state--stroke-color, silver));
    strokeWidth: var(--state-initial--stroke-width, var(--state--stroke-width, 2));
  }
  ${prefix}.statechart .state-final {
    fill: var(--state-final--fill, var(--state--fill, none));
    stroke: var(--state-final--stroke, var(--state--stroke-color, silver));
    strokeWidth: var(--state-final--stroke-width, var(--state--stroke-width, 2));
  }
  ${prefix}.statechart .state-final.inner {
    fill: var(--state-final--stroke, var(--state--stroke-color, silver));
    stroke: none;
    strokeWidth: 0;
  }

  ${prefix}.statechart .transition-label {
    fill: var(--transition-label--color, gray);
    font-size: var(--transition-label--font-size, 12px);
    font-family: var(--transition-label--font-family, sans-serif);
  }

  ${prefix}.statechart .state-label {
    fill: var(--state-label--color, gray);
    font-size: var(--state-label--font-size, 14px);
    font-family: var(--state-label--font-family, sans-serif);
  }
  `;
}
