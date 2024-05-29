export const data = {
  x: 0,
  y: 0,
  width: 440.72049689440996,
  height: 193,
  nodes: [
    {
      id: "s_0",
      width: 14,
      height: 42,
      state: "",
      key: "<initial>",
      padding: [14, 7, 14, 7],
      fontSize: 14,
      x: 15,
      y: 82.5,
    },
    {
      id: "s_1",
      width: 135.73913043478262,
      height: 42,
      state: "OpenFileSystem",
      key: "OpenFileSystem",
      padding: [14, 7, 14, 7],
      fontSize: 14,
      x: 98.45341614906832,
      y: 82.5,
    },
    {
      id: "s_3",
      width: 92.2608695652174,
      height: 42,
      state: "ShowError",
      key: "ShowError",
      padding: [14, 7, 14, 7],
      fontSize: 14,
      x: 333.4596273291926,
      y: 57,
    },
    {
      id: "s_6",
      width: 14,
      height: 42,
      state: "",
      key: "<final>",
      padding: [14, 7, 14, 7],
      fontSize: 14,
      x: 372.5900621118013,
      y: 165,
    },
  ],
  edges: [
    {
      id: "t_2",
      width: 19.453416149068325,
      height: 24,
      from: "<initial>",
      event: "*",
      to: "OpenFileSystem",
      padding: [6, 6, 6, 6],
      fontSize: 12,
      points: [
        {
          x: 29,
          y: 61.5,
        },
        {
          x: 63.72670807453416,
          y: 61.5,
        },
        {
          x: 98.45341614906832,
          y: 61.5,
        },
      ],
      x: 54,
      y: 95.5,
    },
    {
      id: "t_4",
      width: 49.267080745341616,
      height: 24,
      from: "OpenFileSystem",
      event: "error",
      to: "ShowError",
      padding: [6, 6, 6, 6],
      fontSize: 12,
      points: [
        {
          x: 221.77388512806198,
          y: 40.5,
        },
        {
          x: 283.82608695652175,
          y: 17,
        },
        {
          x: 333.4596273291926,
          y: 26.847515890517577,
        },
      ],
      x: 259.1925465838509,
      y: 51,
    },
    {
      id: "t_5",
      width: 26.906832298136646,
      height: 24,
      from: "OpenFileSystem",
      event: "ok",
      to: "OpenFileSystem",
      padding: [6, 6, 6, 6],
      fontSize: 12,
      points: [
        {
          x: 140.71949269163537,
          y: 82.5,
        },
        {
          x: 98.45341614906832,
          y: 117.16666666666666,
        },
        {
          x: 98.45341614906832,
          y: 125.83333333333334,
        },
        {
          x: 166.32298136645963,
          y: 134.5,
        },
        {
          x: 234.19254658385094,
          y: 125.83333333333334,
        },
        {
          x: 234.19254658385094,
          y: 117.16666666666666,
        },
        {
          x: 191.9264700412839,
          y: 82.5,
        },
      ],
      x: 152.8695652173913,
      y: 164.95341614906832,
    },
    {
      id: "t_7",
      width: 41.81366459627329,
      height: 24,
      from: "OpenFileSystem",
      event: "exit",
      to: "<final>",
      padding: [6, 6, 6, 6],
      fontSize: 12,
      points: [
        {
          x: 196.23286278938454,
          y: 82.5,
        },
        {
          x: 283.82608695652175,
          y: 144,
        },
        {
          x: 372.5900621118013,
          y: 144,
        },
      ],
      x: 262.9192546583851,
      y: 178,
    },
    {
      id: "t_8",
      width: 26.906832298136646,
      height: 24,
      from: "ShowError",
      event: "ok",
      to: "OpenFileSystem",
      padding: [6, 6, 6, 6],
      fontSize: 12,
      points: [
        {
          x: 333.4596273291926,
          y: 52.859839149046564,
        },
        {
          x: 283.82608695652175,
          y: 71,
        },
        {
          x: 234.19254658385094,
          y: 66.98718152024527,
        },
      ],
      x: 270.37267080745346,
      y: 105,
    },
  ],
};