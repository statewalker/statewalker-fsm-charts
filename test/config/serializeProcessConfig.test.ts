import { serializeProcessConfig } from "../../src/config/serializeProcessConfig.ts";
import { describe, it, expect } from "../deps.ts";

describe("serializeProcessConfig", () => {
  it("should ...", () => {
    expect(typeof serializeProcessConfig).toBe("function");
    const result = serializeProcessConfig({
      key: "N",
      foo: "Foo",
      description: "Test state",
      transitions: [["A", "o", "B"]],
      states: [
        {
          key: "A",
          bar: "Bar",
          transitions: [],
        },
        {
          key: "B",
          baz: "Baz",
          transitions: [],
        },
      ],
    });
    expect(result).toEqual(
        `{
  "key": "N",
  "transitions": [
    ["A","o","B"]
  ],
  "states": [
    {
      "key": "A",
      "bar": "Bar"
    },
    {
      "key": "B",
      "baz": "Baz"
    }
  ],
  "foo": "Foo",
  "description": "Test state"
}`
    );
  });
});
