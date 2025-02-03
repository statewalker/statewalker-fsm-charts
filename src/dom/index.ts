import { buildSections, DomSection } from "./buildSections.js";

export function getStateDescriptionRenderer({
  element,
  rootStateKey,
  splitHeader = (
    header?: HTMLElement,
  ): [stateKey: undefined | string, label: string] => {
    if (!header) return [undefined, ""];
    const text = header.innerText.trim();
    let key: string | undefined;
    let label: string = text;
    text.replace(/^\s*\[(.*)\]\s*(.*)$/, (_, k, l) => {
      key = k.trim();
      label = l.trim() || key;
      return "";
    });
    return [key, label];
  },
}: {
  element: HTMLElement;
  rootStateKey: string;
  splitHeader?: (
    header?: HTMLElement,
  ) => [stateKey: undefined | string, label: string];
}) {
  const docSections = buildSections(element);
  const rootStateFilter = getStateDescriptionFilter(splitHeader, rootStateKey);
  const rootDescription = findSection(docSections, rootStateFilter);

  if (!rootDescription) {
    return (statesStack: string[]) => {
      return undefined;
    };
  }

  // Remove description nodes from DOM
  for (const node of visitSectionNodes(rootDescription)) {
    if (node.nodeName[0] === "#") continue;
    node.parentElement?.removeChild(node);
  }

  return (statesStack: string[]) => {
    const stateKey = [...statesStack].pop();
    const filter = getStateDescriptionFilter(splitHeader, stateKey);
    const description = findSection(rootDescription, filter);
    if (!description) return;
    const elm = renderSections({
      section: description,
      deep: (s) => !rootStateFilter(s),
      header: (header) => {
        const [key, label] = splitHeader(header);
        if (key === stateKey) {
          return label || key;
        }
        return;
      },
    });
    const details = elm?.querySelector("details");
    details && (details.open = true);
    return elm;
  };

  function getStateDescriptionFilter(
    splitHeader: (header: HTMLElement) => [stateKey?: string, label?: string],
    stateKey?: string,
  ) {
    if (!stateKey) return () => false;
    return (section: DomSection) => {
      if (!section.header) return false;
      const [key] = splitHeader(section.header);
      return key === stateKey;
    };
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

export function renderSections({
  section,
  deep = (s) => true,
  header = (headerElm) => headerElm,
}: {
  section: DomSection;
  deep?: (s: DomSection) => boolean;
  header?: (header: HTMLElement) => undefined | string | HTMLElement;
}) {
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
    const headerElm = header(section.header!);
    headerElm && summary.append(headerElm);
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
