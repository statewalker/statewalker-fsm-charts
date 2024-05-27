export function printStyles({ println }: { println: (str: string) => void; }) {
  return () => {
    println(`<style>
    .statechart {
      border: 1px solid #eee;
      padding: 1em;
      --transition-line-color: silver;
      --transition-background-color: rgba(255,255,255,0.5);
      --transition-text-color: navy;
      
      --state-background-color: none;
      --state-border-color: silver;
      --state-border-width: 2px;
      --state-text-color: silver;
      --state-text-size: 14px;
      --state-text-font: sans-serif;
    }
    .statechart text {
      font-size: 14px;
      font-family: sans-serif;
    }
    
    .statechart .state-background,
    .statechart .state-symbol-initial,
    .statechart .state-symbol-final {
      fill: var(--state-background-color, none);
      stroke: var(--state-border-color, silver);
      stroke-width: var(--state-border-width, 1px);
    }
    .statechart .state-symbol-final-inner {
      fill: var(--state-border-color, silver);
    }
    
    .statechart .transition-background {
      fill: var(--transition-background-color, none);
    }
    .statechart .transition-line {
      stroke: var(--transition-line-color, gray);
      stroke-width: 1px;
    }
    .statechart .transition-marker {
      stroke: none;
      stroke-width: 1px;
      fill: var(--transition-line-color, gray); 
    }
    .statechart .transition-text {
      stroke: var(--transition-text-color, black);
    }
  </style>`);
  };
}
