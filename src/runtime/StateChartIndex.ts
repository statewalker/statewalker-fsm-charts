import type {
  StateChart,
  StateGraphNode,
  StateGraphEdge,
} from "../types/index.ts";

export class StateChartIndex {
  statechart: StateChart;
  _chartsIndex: Record<string, StateChart> = {};
  _nodesIndex: Record<string, StateGraphNode> = {};
  _nodesParentsIndex: Record<string, string> = {};
  _edgeIndex: Record<string, StateGraphEdge> = {};
  _edgesParentsIndex: Record<string, string> = {};

  constructor({ statechart }: { statechart: StateChart }) {
    this.statechart = statechart;
    this._buildIndexes();
  }

  /**
   * Transforms a stack of state keys to the corresponding identifiers.
   * If a key in the stack was not found then this method returns
   * an empty stack.
   * @param stack a stack of state keys
   * @returns a stack of state identifiers for the given states
   */
  getStatesIds(...stack: string[]): string[] {
    let result = [];
    let list = [this.statechart] as (StateChart | StateGraphNode)[];
    for (let i = 0; list?.length > 0 && i < stack.length; i++) {
      const key = stack[i];
      const node = list.find((node) => node.key === key);
      if (!node) break;
      result.push(node.id);
      list = node.children;
      if (!list?.length) list = node.nodes;
    }
    return result.length === stack.length ? result : [];
  }

  /**
   * Returns graph nodes for the specified identifier.
   * @param id the id of a  node
   * @returns a stack of nodes
   */
  getStackByStateId(id?: string): StateGraphNode[] {
    if (!id) return [];
    const node = this._chartsIndex[id] || this._nodesIndex[id];
    if (!node) return [];
    const parentId = this._nodesParentsIndex[id];
    if (parentId) {
      const parentStack = this.getStackByStateId(parentId);
      if (!parentStack.length) return [];
      parentStack.push(node);
      return parentStack;
    } else {
      return [node];
    }
  }

  /**
   * Returns an edge object corresponding to the transition from the state
   * @param stateId identifier of the source state
   * @param event an event triggering the transition
   * @returns graph edge
   */
  getTransition(stateId?: string, event?: string): StateGraphEdge | undefined {
    const stack = this.getStackByStateId(stateId);
    const state = stack.pop();
    if (!state || !stack.length) return;
    const parent = stack[stack.length - 1];
    const t = parent.edges.find(
      (t: StateGraphEdge) => t.from === state.key && t.event === event
    );
    return t;
  }

  /**
   * Returns a list of edge objects corresponding to all transitions from the state
   * @param stateId identifier of the source state
   * @returns a list of graph edges
   */
  getTransitions(stateId?: string): StateGraphEdge[] {
    const stack = this.getStackByStateId(stateId);
    const state = stack.pop();
    if (!state || !stack.length) return [];
    const parent = stack[stack.length - 1];
    return parent.edges.filter((t: StateGraphEdge) => t.from === state.key);
  }

  /**
   * Returns a graph node corresponding to the specified state id.
   * @param stateId identifier of the state
   * @returns graph node
   * @see getStateChart
   */
  getStateNode(stateId?: string): StateGraphNode | undefined {
    return stateId ? this._nodesIndex[stateId] : undefined;
  }

  /**
   * Returns a chart corresponding to the specified state id.
   * @param stateId identifier of the state
   * @returns graph node
   * @see getStateNode
   */
  getStateChart(stateId?: string): StateChart | undefined {
    return stateId ? this._chartsIndex[stateId] : undefined;
  }

  /**
   * Returns ids of the previous and next state for the specified transition
   * @param transition a graph edge instance defining transition
   * @returns an array with two identifiers - [sourceStateId, targetStateId] - the source state id and target state id
   */
  getTransitionStateIds(
    transition?: StateGraphEdge
  ): [string | undefined, string | undefined] {
    const result: [string | undefined, string | undefined] = [
      undefined,
      undefined,
    ];
    if (!transition) return result;
    const parentId = this._edgesParentsIndex[transition.id];
    if (!parentId) return result;
    const parent = this._chartsIndex[parentId];
    if (!parent) return result;
    parent.nodes.forEach((node: StateGraphNode) => {
      if (node.key === transition.from) {
        result[0] = node.id;
      }
      if (node.key === transition.to) {
        result[1] = node.id;
      }
    });
    return result;
  }

  // ----------------------------------------------------------
  // Internal methods
  _buildIndexes() {
    const addToIndex = (chart: StateChart) => {
      const chartId = chart.id;
      this._chartsIndex[chartId] = chart;
      if (!(chartId in this._nodesIndex)) {
        this._nodesIndex[chartId] = chart;
      }
      chart.nodes.forEach((node) => {
        const nodeId = node.id;
        this._nodesIndex[nodeId] = node;
        this._nodesParentsIndex[nodeId] = chartId;
      });
      chart.edges.forEach((edge) => {
        const edgeId = edge.id;
        this._edgeIndex[edgeId] = edge;
        this._edgesParentsIndex[edgeId] = chartId;
      });
      (chart.children || []).forEach((child) => {
        this._nodesParentsIndex[child.id] = chartId;
        addToIndex(child);
      });
    };
    addToIndex(this.statechart);
  }
}
