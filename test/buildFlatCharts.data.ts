export const tests: {
  message: string;
  transitions: [string, string, string][];
  control: any;
}[] = [
  {
    message: "should generate empty graph",
    transitions: [],
    control: {
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      nodes: [],
      edges: [],
    },
  },
  {
    message: "should generate graph for initial transition",
    transitions: [["", "", "a"]],
    control: {
      x: 0,
      y: 0,
      width: 87,
      height: 48,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 5,
          y: 25,
        },
        {
          id: "s_1",
          width: 15,
          height: 20,
          state: "a",
          key: "a",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 67,
          y: 25,
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
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 11,
              y: 15,
            },
            {
              x: 39,
              y: 15,
            },
            {
              x: 67,
              y: 15,
            },
          ],
          x: 36,
          y: 43,
        },
      ],
    },
  },
  {
    message: "should generate graph for 'fork' transitions",
    transitions: [
      ["", "", "a"],
      ["a", "ok", "b"],
      ["a", "ok", "c"],
    ],
    control: {
      x: 0,
      y: 0,
      width: 173,
      height: 118,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 5,
          y: 60,
        },
        {
          id: "s_1",
          width: 15,
          height: 20,
          state: "a",
          key: "a",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 67,
          y: 60,
        },
        {
          id: "s_3",
          width: 15,
          height: 20,
          state: "b",
          key: "b",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 153,
          y: 25,
        },
        {
          id: "s_5",
          width: 15,
          height: 20,
          state: "c",
          key: "c",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 153,
          y: 95,
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
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 11,
              y: 50,
            },
            {
              x: 39,
              y: 50,
            },
            {
              x: 67,
              y: 50,
            },
          ],
          x: 36,
          y: 78,
        },
        {
          id: "t_4",
          width: 21,
          height: 18,
          from: "a",
          event: "ok",
          to: "b",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 82,
              y: 44,
            },
            {
              x: 118,
              y: 15,
            },
            {
              x: 153,
              y: 15,
            },
          ],
          x: 107,
          y: 43,
        },
        {
          id: "t_6",
          width: 21,
          height: 18,
          from: "a",
          event: "ok",
          to: "c",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 82,
              y: 56,
            },
            {
              x: 118,
              y: 85,
            },
            {
              x: 153,
              y: 85,
            },
          ],
          x: 107,
          y: 113,
        },
      ],
    },
  },
  {
    message: "should generate graph for linear transitions",
    transitions: [
      ["", "", "a"],
      ["a", "ok", "b"],
      ["b", "ok", "c"],
    ],
    control: {
      x: 0,
      y: 0,
      width: 259,
      height: 48,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 5,
          y: 25,
        },
        {
          id: "s_1",
          width: 15,
          height: 20,
          state: "a",
          key: "a",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 67,
          y: 25,
        },
        {
          id: "s_3",
          width: 15,
          height: 20,
          state: "b",
          key: "b",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 153,
          y: 25,
        },
        {
          id: "s_5",
          width: 15,
          height: 20,
          state: "c",
          key: "c",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 239,
          y: 25,
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
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 11,
              y: 15,
            },
            {
              x: 39,
              y: 15,
            },
            {
              x: 67,
              y: 15,
            },
          ],
          x: 36,
          y: 43,
        },
        {
          id: "t_4",
          width: 21,
          height: 18,
          from: "a",
          event: "ok",
          to: "b",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 82,
              y: 15,
            },
            {
              x: 118,
              y: 15,
            },
            {
              x: 153,
              y: 15,
            },
          ],
          x: 107,
          y: 43,
        },
        {
          id: "t_6",
          width: 21,
          height: 18,
          from: "b",
          event: "ok",
          to: "c",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 168,
              y: 15,
            },
            {
              x: 204,
              y: 15,
            },
            {
              x: 239,
              y: 15,
            },
          ],
          x: 193,
          y: 43,
        },
      ],
    },
  },
  {
    message: "should generate graph for simple cycle transitions",
    transitions: [
      ["", "", "a"],
      ["a", "forward", "b"],
      ["b", "back", "a"],
    ],
    control: {
      x: 0,
      y: 0,
      width: 210,
      height: 76,
      nodes: [
        {
          id: "s_0",
          width: 6,
          height: 20,
          state: "",
          key: "<initial>",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 5,
          y: 29,
        },
        {
          id: "s_1",
          width: 15,
          height: 20,
          state: "a",
          key: "a",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 67,
          y: 29,
        },
        {
          id: "s_3",
          width: 15,
          height: 20,
          state: "b",
          key: "b",
          padding: [3, 3, 3, 3],
          fontSize: 14,
          x: 190,
          y: 29,
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
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 11,
              y: 19,
            },
            {
              x: 39,
              y: 19,
            },
            {
              x: 67,
              y: 19,
            },
          ],
          x: 36,
          y: 47,
        },
        {
          id: "t_4",
          width: 58,
          height: 18,
          from: "a",
          event: "forward",
          to: "b",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 82,
              y: 16,
            },
            {
              x: 136,
              y: -5,
            },
            {
              x: 190,
              y: 16,
            },
          ],
          x: 107,
          y: 23,
        },
        {
          id: "t_5",
          width: 36,
          height: 18,
          from: "b",
          event: "back",
          to: "a",
          padding: [3, 3, 3, 3],
          fontSize: 12,
          points: [
            {
              x: 190,
              y: 22,
            },
            {
              x: 136,
              y: 43,
            },
            {
              x: 82,
              y: 22,
            },
          ],
          x: 118,
          y: 71,
        },
      ],
    },
  },
];