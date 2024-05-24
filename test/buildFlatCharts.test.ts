import { buildFlatCharts } from "../src/buildFlatCharts.ts";
import { TransitionsGraph } from "../src/TransitionsGraph.ts";
import { getGraphParamsProvider } from "../src/getGraphParamsProvider.ts";
import { Transition } from "../src/Transition.ts";
import { describe, it, expect } from "./deps.ts";

describe("buildFlatCharts", () => {
  function testCharts(
    message: string,
    transitions: Transition[],
    expected: TransitionsGraph
  ) {
    it(message, () => {
      let idCounter = 0;
      const { getStateParams, getTransitionParams } = getGraphParamsProvider({
        stateFontSize: 14,
        stateTextPadding: 3,
        transitionsFontSize: 12,
        transitionsTextPadding: 3,
      });
      const result = buildFlatCharts({
        transitions,
        newId: (prefix: string) => `${prefix}_${idCounter++}`,
        getStateParams,
        getTransitionParams,
      });
      try {
        expect(result).toEqual(expected);
      } catch (err) {
        console.log("RESULT", JSON.stringify(result, null, 2));
        throw err;
      }
    });
  }

  testCharts("should generate empty graph", [], {
    height: 0,
    width: 0,
    nodes: [],
    edges: [],
  });

  testCharts("should generate graph for initial transition", [["", "", "a"]], {
    width: 92,
    height: 75,
    nodes: [
      {
        id: "s_0",
        width: 6,
        height: 22,
        state: "",
        key: "<initial>",
        x: 3,
        y: 11,
      },
      {
        id: "s_1",
        width: 20,
        height: 22,
        state: "a",
        key: "a",
        x: 72,
        y: 11,
      },
    ],
    edges: [
      {
        id: "t_2",
        width: 6,
        height: 36,
        from: "<initial>",
        event: "",
        to: "a",
        points: [
          {
            x: 6,
            y: 11,
          },
          {
            x: 34,
            y: 11,
          },
          {
            x: 62,
            y: 11,
          },
        ],
        x: 34,
        y: 39,
      },
    ],
  });
  testCharts(
    "should generate graph for 'fork' transitions",
    [
      ["", "", "a"],
      ["a", "ok", "b"],
      ["a", "ok", "c"],
    ],
    {
      width: 192,
      height: 147,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 22,
          state: "",
          key: "<initial>",
          x: 3,
          y: 47,
        },
        {
          id: "s_1",
          width: 20,
          height: 22,
          state: "a",
          key: "a",
          x: 72,
          y: 47,
        },
        {
          id: "s_3",
          width: 20,
          height: 22,
          state: "b",
          key: "b",
          x: 172,
          y: 11,
        },
        {
          id: "s_5",
          width: 20,
          height: 22,
          state: "c",
          key: "c",
          x: 172,
          y: 83,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 36,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 47,
            },
            {
              x: 34,
              y: 47,
            },
            {
              x: 62,
              y: 47,
            },
          ],
          x: 34,
          y: 75,
        },
        {
          id: "t_4",
          width: 30,
          height: 36,
          from: "a",
          event: "ok",
          to: "b",
          points: [
            {
              x: 82,
              y: 39.8,
            },
            {
              x: 122,
              y: 11,
            },
            {
              x: 162,
              y: 11,
            },
          ],
          x: 122,
          y: 39,
        },
        {
          id: "t_6",
          width: 30,
          height: 36,
          from: "a",
          event: "ok",
          to: "c",
          points: [
            {
              x: 82,
              y: 54.2,
            },
            {
              x: 122,
              y: 83,
            },
            {
              x: 162,
              y: 83,
            },
          ],
          x: 122,
          y: 111,
        },
      ],
    }
  );

  testCharts(
    "should generate graph for linear transitions",
    [
      ["", "", "a"],
      ["a", "ok", "b"],
      ["b", "ok", "c"],
    ],
    {
      width: 292,
      height: 75,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 22,
          state: "",
          key: "<initial>",
          x: 3,
          y: 11,
        },
        {
          id: "s_1",
          width: 20,
          height: 22,
          state: "a",
          key: "a",
          x: 72,
          y: 11,
        },
        {
          id: "s_3",
          width: 20,
          height: 22,
          state: "b",
          key: "b",
          x: 172,
          y: 11,
        },
        {
          id: "s_5",
          width: 20,
          height: 22,
          state: "c",
          key: "c",
          x: 272,
          y: 11,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 36,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 11,
            },
            {
              x: 34,
              y: 11,
            },
            {
              x: 62,
              y: 11,
            },
          ],
          x: 34,
          y: 39,
        },
        {
          id: "t_4",
          width: 30,
          height: 36,
          from: "a",
          event: "ok",
          to: "b",
          points: [
            {
              x: 82,
              y: 11,
            },
            {
              x: 122,
              y: 11,
            },
            {
              x: 162,
              y: 11,
            },
          ],
          x: 122,
          y: 39,
        },
        {
          id: "t_6",
          width: 30,
          height: 36,
          from: "b",
          event: "ok",
          to: "c",
          points: [
            {
              x: 182,
              y: 11,
            },
            {
              x: 222,
              y: 11,
            },
            {
              x: 262,
              y: 11,
            },
          ],
          x: 222,
          y: 39,
        },
      ],
    }
  );

  testCharts(
    "should generate graph for simple cycle transitions",
    [
      ["", "", "a"],
      ["a", "forward", "b"],
      ["b", "back", "a"],
    ],
    {
      width: 252,
      height: 120,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 22,
          state: "",
          key: "<initial>",
          x: 3,
          y: 23,
        },
        {
          id: "s_1",
          width: 20,
          height: 22,
          state: "a",
          key: "a",
          x: 72,
          y: 23,
        },
        {
          id: "s_3",
          width: 20,
          height: 22,
          state: "b",
          key: "b",
          x: 232,
          y: 23,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 36,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 23,
            },
            {
              x: 34,
              y: 23,
            },
            {
              x: 62,
              y: 23,
            },
          ],
          x: 34,
          y: 51,
        },
        {
          id: "t_4",
          width: 90,
          height: 36,
          from: "a",
          event: "forward",
          to: "b",
          points: [
            {
              x: 82,
              y: 18.875,
            },
            {
              x: 152,
              y: -10,
            },
            {
              x: 222,
              y: 18.875,
            },
          ],
          x: 152,
          y: 18,
        },
        {
          id: "t_5",
          width: 54,
          height: 36,
          from: "b",
          event: "back",
          to: "a",
          points: [
            {
              x: 222,
              y: 27.125,
            },
            {
              x: 152,
              y: 56,
            },
            {
              x: 82,
              y: 27.125,
            },
          ],
          x: 152,
          y: 84,
        },
      ],
    }
  );

  // const { nodes, edges } = buildFlatCharts({
  //   transitions,
  //   newId,
  //   stateFontSize: 14,
  //   stateTextPadding: 3,
  //   transitionsFontSize: 12,
  //   transitionsTextPadding: 3,
  // });

  // console.log("NODES", nodes);
  // console.log("EDGES", edges);
});
