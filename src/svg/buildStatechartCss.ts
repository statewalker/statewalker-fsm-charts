export function buildStatechartCss({ prefix = "" } = {}) {
  return `
    --state--fill: white;
    --state--stroke-color: silver;
    --state--stroke-width: 1px;

    --state-initial--fill: var(--state--fill, white);
    --state-initial--stroke-color: var(--state--stroke-color, silver);
    --state-initial--stroke-width: var(--state--stroke-width, 1px);

    --state-final--fill: var(--state--fill, white);
    --state-final--stroke-color: var(--state--stroke-color, silver);
    --state-final--stroke-width: var(--state--stroke-width, 1px);

    --state-label--color: gray;
    --state-label--font-size: 14px;
    --state-label--font-family: sans-serif;

    --transition--fill: rgba(255,255,255,0.7);
    --transition--stroke-color: none;
    --transition--stroke-width: 1;

    --transition-line--stroke-color: silver;
    --transition-line--stroke-width: 1px;

    --transition-label--color: gray;
    --transition-label--font-size: 12px;
    --transition-label--font-family: sans-serif;

    --transition-marker--fill: var(--transition-line--stroke-color, gray);
    
  .state-details {
    
  }
  
  .state-details  {
    background-color: var(--state--fill, white);
    border: var(--state--stroke-width, 1px) solid var(--state--stroke-color, silver);
    border-radius: 0.5em;
    padding: 0.5em;
  }

  .state-details .state-label {
    cursor: pointer;
    color: var(--transition-label--color, gray);
    font-family: var(--state-label--font-family, sans-serif);
    font-size: var(--state-label--font-size, 14px);
  }
  .state-details .state-description {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .state-details  .statechart {

  }

  .state-details  .statechart .transition-marker {
    fill : var(--transition-marker--fill, silver);
  }

  .state-details  .statechart .transitions {
  }

  .state-details  .statechart .transitions .transition .transition-line {
    stroke: var(--transition-line--stroke-color, silver);
    stroke-width: var(--transition-line--stroke-width, 1px);
  }

  .state-details  .statechart .transitions .transition .transition-box {
    fill: var(--transition--fill, rgba(255,255,255,0.7));
    stroke: var(--transition--stroke-color, none);
    stroke-width: var(--transition--stroke-width, 1);
    border-radius: 0.5em;
  }

  .state-details  .statechart .transitions .transition .transition-label {
    fill: var(--transition-label--color, gray);
    font-size: var(--transition-label--font-size, 12px);
    font-family: var(--transition-label--font-family, sans-serif);
  }

  /* ------------------------------------------ */
  .state-details  .statechart .states .state {
  }
  .state-details  .statechart .states .state .state-box {
    fill: var(--state--fill, white);
    stroke: var(--state--stroke-color, silver);
    stroke-width: var(--state--stroke-width, 1px);
    border-radius: 0.5em;
  }
  .state-details  .statechart .states .state .state-initial {
    fill: var(--state-initial--fill, white);
    stroke: var(--state-initial--stroke-color, gray); 
    stroke-width: var(--state-initial--stroke-width, 2);
  }
  .state-details  .statechart .states .state .state-final {
    fill: var(--state-final--fill, white);
    stroke: var(--state-final--stroke-color, silver);
    stroke-width: var(--state-final--stroke-width, 2);
  }
  .state-details  .statechart .states .state .state-final.inner {
    fill: var(--state-final--stroke-color, silver);
    stroke: none;
    stroke-width: 0;
  }
  .state-details  .statechart .states .state .state-label {
    fill: var(--state-label--color, gray);
    font-size: var(--state-label--font-size, 14px);
    font-family: var(--state-label--font-family, sans-serif);
  }

  `;
}
