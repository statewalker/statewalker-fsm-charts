export const a = "a";

// class RuntimeStatechartsApi {
//   constructor({ element, statechart }) {
//     this.element = element;
//     this.statechart = statechart;
//     // this._statesIndex = {};
//     // this._transitionsIndex = {};
//     // this._buildIndexes(this.statechart);
//   }

//   _applyStateModifier(cssSelector, modifier = "selected", apply) {
//     const detailsModifier = `state-details--${modifier}`;
//     const stateLabelsModifier = `state-details__label--${modifier}`;
//     const stateModifier = `state--${modifier}`;
//     [...this.element.querySelectorAll(cssSelector)].forEach((elm) => {
//       if (elm.tagName.toLowerCase() === "details") {
//         apply(elm, detailsModifier);
//         const labelElm = elm.querySelector(".state-details__label");
//         if (labelElm) apply(labelElm, stateLabelsModifier);
//       } else {
//         apply(elm, stateModifier);
//       }
//     });
//   }

//   _applyTransitionsModifier(cssSelector, modifier = "selected", action) {}

//   deselectAllTransitions() {
//     const removeClass = (elm, cls) => elm.classList.remove(cls);
//     this._applyTransitionsModifier(
//       "[data-transition-id]",
//       "selected",
//       removeClass
//     );
//   }
//   deselectTransitions(...ids) {
//     const removeClass = (elm, cls) => elm.classList.remove(cls);
//     for (const id of ids) {
//       this._applyTransitionsModifier(
//         `[data-transition-id="${id}"]`,
//         "selected",
//         removeClass
//       );
//     }
//   }
//   selectTransitions(...ids) {
//     const addClass = (elm, cls) => elm.classList.add(cls);
//     for (const id of ids) {
//       this._applyTransitionsModifier(
//         `[data-transition-id="${id}"]`,
//         "selected",
//         addClass
//       );
//     }
//   }

//   deselectAllStates() {
//     const removeClass = (elm, cls) => elm.classList.remove(cls);
//     this._applyStateModifier("[data-state-id]", "selected", removeClass);
//   }
//   deselectStates(...ids) {
//     const removeClass = (elm, cls) => elm.classList.remove(cls);
//     for (const id of ids) {
//       this._applyStateModifier(
//         `[data-state-id="${id}"]`,
//         "selected",
//         removeClass
//       );
//     }
//   }
//   selectStates(...ids) {
//     const addClass = (elm, cls) => elm.classList.add(cls);
//     for (const id of ids) {
//       this._applyStateModifier(`[data-state-id="${id}"]`, "selected", addClass);
//     }
//   }

//   // -----------------------------------------------
//   // Access to charts data
//   // - get state ids by stack of state keys
//   // - get stack of states by state id
//   // - get transitionId by stateId + event
//   // - get targetId, sourceId, event by transitionId
//   getStatesIds(...stack) {
//     let statechart = this.statechart;
//     let result = [];
//     if (statechart.key === stack[0]) {
//       result.push(statechart.id);
//       for (let i = 1; i < stack.length; i++) {
//         const key = stack[i];
//         let id = statechart.graph.nodes.find((node) => node.key === key)?.id;
//         if (!id) break;
//         result.push(id);
//         statechart = (statechart.children || []).find(
//           (child) => child.key === key
//         );
//       }
//     }
//     return result.length === stack.length ? result : [];
//   }

//   getStackByStateId(id) {
//     return this._getStack(id, ({ id, key }) => key);
//   }

//   getTransition(stateId, event) {
//     const stack = this._getStack(stateId);
//     const state = stack.pop();
//     if (!state || !stack.length) return;
//     const parent = stack[stack.length - 1];
//     const t = parent.graph.edges.find(
//       (t) => t.from === state.key && t.event === event
//     );
//     if (!t) return;
//     const to = parent.graph.nodes.find((n) => n.key === t.to);
//     return to && { id: t.id, fromId: state.id, event: t.event, toId: to.id };
//   }

//   _getStack(id, get = (d) => d) {
//     return findById(this.statechart, id, get);

//     function findById(statechart, id, get, stack = []) {
//       try {
//         stack.push(get(statechart));
//         if (statechart.id === id) {
//           return [...stack];
//         } else {
//           let node = statechart.graph.nodes.find((node) => node.id === id);
//           if (node) {
//             return [...stack, get(node)];
//           } else {
//             let result;
//             if (statechart.children) {
//               for (const child of statechart.children) {
//                 result = findById(child, id, get, stack);
//                 if (result) break;
//               }
//             }
//             return result;
//           }
//         }
//       } finally {
//         stack.pop();
//       }
//     }
//   }

//   // getTransitionId(stateId, event) {
//   // }

//   //   const stateInfo = this._statesIndex[stateId];
//   //   if (!stateInfo) return;
//   //   if (stateInfo.parent) return ;
//   //   const targetState = stateInfo.parent.
//   //   const fromId = stateIds.pop();
//   //   const parentId = stateIds.pop();
//   //   const parent = parentId ? this._statesIndex[parentId] : null;
//   //   return parent
//   //     ? parent.graph?.edges.find(
//   //         (edge) => edge.from === fromId && edge.event === event
//   //       )
//   //     : undefined;
//   // }

//   // _getInfo(index, id, create) {
//   //   let info = index[id];
//   //   if (!info && create) {
//   //     info = index[id] = { id };
//   //   }
//   //   return info;
//   // }
//   // _getStateInfo(id, create) {
//   //   return this._getInfo(this._statesIndex, id, create);
//   // }
//   // _getTransitionInfo(id, create) {
//   //   return this._getInfo(this._transitionsIndex, id, create);
//   // }
//   // _buildIndexes(statechart) {
//   //   const { id, key } = statechart;
//   //   const stateInfo = this._getStateInfo(id, true);
//   //   stateInfo.key = key;
//   //   stateInfo.detailsElement = this.element.querySelector(
//   //     `details[data-state-id="${id}"]`
//   //   );
//   //   for (const node of statechart.graph?.nodes || []) {
//   //     const info = this._getStateInfo(node.id, true);
//   //     info.parent = stateInfo;
//   //     // info.parentId = id;
//   //     info.node = node;
//   //     info.key = node.key;
//   //     info.svgGroupElement = this.element.querySelector(
//   //       `g[data-state-id="${info.id}"]`
//   //     );
//   //   }
//   //   for (const edge of statechart.graph?.edges || []) {
//   //     const info = this._getTransitionInfo(edge.id, true);
//   //     info.transition = edge;
//   //     info.from = edge.from;
//   //     info.event = edge.event;
//   //     info.to = edge.to;
//   //     info.svgGroupElement = this.element.querySelector(
//   //       `g[data-transition-id="${info.id}"]`
//   //     );
//   //   }

//   //   for (const child of statechart.children) {
//   //     this._buildIndexes(child);
//   //   }
//   // }
// }
