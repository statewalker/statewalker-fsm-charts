import { buildFlatCharts } from "../src/layout/buildFlatCharts.ts";
import { TransitionsGraph } from "../src/layout/TransitionsGraph.ts";
import { getGraphParamsProvider } from "../src/layout/getGraphParamsProvider.ts";
import { Transition } from "../src/layout/Transition.ts";
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
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    nodes: [],
    edges: [],
  });
  testCharts("should generate graph for initial transition", [["", "", "a"]], {
    x: 0,
    y: 0,
    width: 82,
    height: 38,
    nodes: [
      {
        id: "s_0",
        width: 6,
        height: 20,
        state: "",
        key: "<initial>",
        x: 0,
        y: 0,
      },
      {
        id: "s_1",
        width: 20,
        height: 20,
        state: "a",
        key: "a",
        x: 62,
        y: 0,
      },
    ],
    edges: [
      {
        id: "t_2",
        width: 6,
        height: 18,
        from: "<initial>",
        event: "",
        to: "a",
        points: [
          {
            x: 6,
            y: 10,
          },
          {
            x: 34,
            y: 10,
          },
          {
            x: 62,
            y: 10,
          },
        ],
        x: 31,
        y: 20,
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
      x: 0,
      y: 0,
      width: 182,
      height: 108,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          x: 0,
          y: 35,
        },
        {
          id: "s_1",
          width: 20,
          height: 20,
          state: "a",
          key: "a",
          x: 62,
          y: 35,
        },
        {
          id: "s_3",
          width: 20,
          height: 20,
          state: "b",
          key: "b",
          x: 162,
          y: 0,
        },
        {
          id: "s_5",
          width: 20,
          height: 20,
          state: "c",
          key: "c",
          x: 162,
          y: 70,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 18,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 45,
            },
            {
              x: 34,
              y: 45,
            },
            {
              x: 62,
              y: 45,
            },
          ],
          x: 31,
          y: 55,
        },
        {
          id: "t_4",
          width: 30,
          height: 18,
          from: "a",
          event: "ok",
          to: "b",
          points: [
            {
              x: 82,
              y: 38,
            },
            {
              x: 122,
              y: 10,
            },
            {
              x: 162,
              y: 10,
            },
          ],
          x: 107,
          y: 20,
        },
        {
          id: "t_6",
          width: 30,
          height: 18,
          from: "a",
          event: "ok",
          to: "c",
          points: [
            {
              x: 82,
              y: 52,
            },
            {
              x: 122,
              y: 80,
            },
            {
              x: 162,
              y: 80,
            },
          ],
          x: 107,
          y: 90,
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
      x: 0,
      y: 0,
      width: 282,
      height: 38,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          x: 0,
          y: 0,
        },
        {
          id: "s_1",
          width: 20,
          height: 20,
          state: "a",
          key: "a",
          x: 62,
          y: 0,
        },
        {
          id: "s_3",
          width: 20,
          height: 20,
          state: "b",
          key: "b",
          x: 162,
          y: 0,
        },
        {
          id: "s_5",
          width: 20,
          height: 20,
          state: "c",
          key: "c",
          x: 262,
          y: 0,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 18,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 10,
            },
            {
              x: 34,
              y: 10,
            },
            {
              x: 62,
              y: 10,
            },
          ],
          x: 31,
          y: 20,
        },
        {
          id: "t_4",
          width: 30,
          height: 18,
          from: "a",
          event: "ok",
          to: "b",
          points: [
            {
              x: 82,
              y: 10,
            },
            {
              x: 122,
              y: 10,
            },
            {
              x: 162,
              y: 10,
            },
          ],
          x: 107,
          y: 20,
        },
        {
          id: "t_6",
          width: 30,
          height: 18,
          from: "b",
          event: "ok",
          to: "c",
          points: [
            {
              x: 182,
              y: 10,
            },
            {
              x: 222,
              y: 10,
            },
            {
              x: 262,
              y: 10,
            },
          ],
          x: 207,
          y: 20,
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
      x: 0,
      y: 0,
      width: 242,
      height: 66,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          x: 0,
          y: 4,
        },
        {
          id: "s_1",
          width: 20,
          height: 20,
          state: "a",
          key: "a",
          x: 62,
          y: 4,
        },
        {
          id: "s_3",
          width: 20,
          height: 20,
          state: "b",
          key: "b",
          x: 222,
          y: 4,
        },
      ],
      edges: [
        {
          id: "t_2",
          width: 6,
          height: 18,
          from: "<initial>",
          event: "",
          to: "a",
          points: [
            {
              x: 6,
              y: 14,
            },
            {
              x: 34,
              y: 14,
            },
            {
              x: 62,
              y: 14,
            },
          ],
          x: 31,
          y: 24,
        },
        {
          id: "t_4",
          width: 90,
          height: 18,
          from: "a",
          event: "forward",
          to: "b",
          points: [
            {
              x: 82,
              y: 11,
            },
            {
              x: 152,
              y: -10,
            },
            {
              x: 222,
              y: 11,
            },
          ],
          x: 107,
          y: 0,
        },
        {
          id: "t_5",
          width: 54,
          height: 18,
          from: "b",
          event: "back",
          to: "a",
          points: [
            {
              x: 222,
              y: 17,
            },
            {
              x: 152,
              y: 38,
            },
            {
              x: 82,
              y: 17,
            },
          ],
          x: 125,
          y: 48,
        },
      ],
    }
  );
});
