export type DomSection = {
  header?: HTMLElement;
  content: Node[];
  children: DomSection[];
};

export function getStateDescriptionRenderer(
  docNode: HTMLElement,
  rootStateKey: string,
) {
  const docSections = buildSections(docNode);
  const rootStateFilter = getStateDescriptionFilter(rootStateKey);
  const rootDescription = findSection(docSections, rootStateFilter);

  if (!rootDescription) {
    return () => {};
  }
  // Remove description nodes from DOM
  extractSectionDomNodes(rootDescription);

  return (statesStack: string[]) => {
    const stateKey = [...statesStack].pop();
    const filter = getStateDescriptionFilter(stateKey);
    const description = findSection(rootDescription, filter);
    const elm = renderSections(description, (s) => !rootStateFilter(s));
    const details = elm?.querySelector("details");
    details && (details.open = true);
    return elm;
  };

  function getStateDescriptionFilter(stateKey?: string) {
    if (!stateKey) return () => false;
    return (section: DomSection) => {
      const text = section.header?.innerText.trim();
      // if (text === stateKey) return true;
      return !!(text?.indexOf(stateKey) === 0);
    };
  }
}

export function extractSectionDomNodes(section: DomSection): DomSection {
  for (const node of visitSectionNodes(section)) {
    if (node.nodeName[0] === "#") continue;
    node.parentElement?.removeChild(node);
  }
  return section;
}

export function* visitDom(elm: Node): Iterable<Node> {
  for (let node = elm.firstChild; node; node = node.nextSibling) {
    if (isDomElement(node)) {
      if (node.tagName === "DIV") {
        yield* visitDom(node);
      } else {
        yield node;
      }
    } else {
      yield node;
    }
  }
}

export function* visitSectionNodes(section: DomSection): Iterable<Node> {
  if (section.header) yield section.header;
  yield* section.content;
  for (const s of vistSections(section, true)) {
    yield* visitSectionNodes(s);
  }
}

export function* vistSections(
  root: DomSection,
  ignoreRoot: boolean = false,
): Generator<DomSection> {
  !ignoreRoot && (yield root);
  for (const child of root.children) {
    yield* vistSections(child, false);
  }
}

export function findSection(
  section: DomSection,
  accept: (section: DomSection) => boolean,
) {
  for (const s of vistSections(section)) {
    if (accept(s) === true) return s;
  }
}

function isDomElement(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

function newAligner<T extends unknown[] = []>(context: {
  enter: (level: number, ...params: T) => void;
  exit: (level: number, ...params: T) => void;
}) {
  let level = -1;
  return (newLevel: number, ...params: T) => {
    while (level >= 0 && level >= newLevel) {
      context.exit(level--, ...params);
    }
    while (level < newLevel) {
      context.enter(++level, ...params);
    }
  };
}

function* toDomNodesIterator(root: Node | Iterable<Node>): Iterable<Node> {
  yield* root instanceof Node ? visitDom(root) : root;
}

export function buildSections(root: HTMLElement | Iterable<Node>): DomSection {
  const nodes = toDomNodesIterator(root);
  let top: DomSection = null!;
  let peek: DomSection = null!;
  const stack: DomSection[] = [];
  const aligner = newAligner<[HTMLElement?]>({
    enter(level, header) {
      const section: DomSection = {
        header,
        content: [],
        children: [],
      };
      top = top || section;
      peek && peek.children.push(section);
      peek = section;
      stack.push(section);
    },
    exit() {
      stack.pop();
      peek = stack[stack.length - 1];
    },
  });
  aligner(0);
  let currentHeaderLevel = 0;
  let currentLevel = 0;
  for (const node of nodes) {
    if (isDomElement(node)) {
      if (/^H[1-6]$/i.test(node.tagName)) {
        const headerLevel = +node.tagName.replace(/^H/, "");
        currentLevel =
          headerLevel > currentHeaderLevel
            ? currentLevel + 1
            : headerLevel < currentHeaderLevel
              ? currentLevel - 1
              : currentLevel;
        currentHeaderLevel = headerLevel;
        aligner(currentLevel, node);
      } else {
        peek.content.push(node);
      }
    } else {
      peek.content.push(node);
    }
  }
  return top.content.length === 0 && top.children.length === 1 && !top.header
    ? top.children[0]
    : top;
}

export function renderSections(
  section?: DomSection,
  deep: (s: DomSection) => boolean = () => true,
) {
  const container = document.createElement("div");
  const id = `id-${String(Math.random()).split(".")[1]}-${Date.now()}`;
  container.setAttribute("id", id);
  if (!section) return container;

  const sectionView = renderSection(section);
  container.append(sectionView);
  const style = renderSectionStyles(id);
  container.append(style);
  return container;

  function renderSectionStyles(id?: string) {
    const prefix = id ? `#${id}` : "";
    const style = document.createElement("style");
    container.appendChild(style);
    style.innerHTML = `
      ${prefix} details {
          border: 1px solid #aaa;
          border-radius: 4px;
          padding: 0.5em 0.5em 0;
          margin-bottom: 0.5em;
        }
        
      ${prefix} details > summary {
          font-weight: bold;
          margin: -0.5em -0.5em 0;
          padding: 0.5em;
          cursor: pointer;
        }
        
      ${prefix} details[open] {
          padding: 0.5em;
        }
      `;
    return style;
  }
  function renderSection(section: DomSection) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    details.appendChild(summary);
    const content = document.createElement("div");
    details.appendChild(content);
    summary.append(section.header?.innerText || " # ");
    for (const node of section.content) {
      if (node.nodeName[0] === "#") continue;
      content.append(node.cloneNode(true));
    }
    if (deep(section)) {
      for (const child of section.children) {
        content.append(renderSection(child));
      }
    }
    return details;
  }
}
