import { newTreeBuilder } from "./newTreeBuilder.js";

export type DomSection = {
  header?: HTMLElement;
  content: Node[];
  children: DomSection[];
};

export function buildSections(root: HTMLElement | Iterable<Node>): DomSection {
  const nodes = toDomNodesIterator(root);
  let top: DomSection = null!;
  let peek: DomSection = null!;
  const stack: DomSection[] = [];
  const aligner = newTreeBuilder<[HTMLElement?]>({
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

// --------------------------------------------
// DOM Iterator utilities

export function isDomElement(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

export function* toDomNodesIterator(
  root: Node | Iterable<Node>,
): Iterable<Node> {
  yield* root instanceof Node ? visitDom(root) : root;
}

export function* visitDom(elm: Node): Iterable<Node> {
  if (isDomElement(elm) && elm.tagName === "TEMPLATE") {
    elm = (elm as HTMLTemplateElement).content;
  }
  for (let node = elm.firstChild; node; node = node.nextSibling) {
    if (isDomElement(node)) {
      if (node.tagName === "DIV" || node.tagName === "TEMPLATE") {
        yield* visitDom(node);
      } else {
        yield node;
      }
    } else {
      yield node;
    }
  }
}
