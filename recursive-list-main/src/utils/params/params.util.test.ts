import { getParamFromPathname } from "./params.util";

describe("Params Util", () => {
  it("Return empty for pathname", () => {
    expect(getParamFromPathname("/")).toEqual("");
  });

  it("Return `components` when pathname is `/src/components`", () => {
    expect(getParamFromPathname("/src/components")).toEqual("components");
  });

  it("Return `components` when pathname is `/src/components/headers`", () => {
    expect(getParamFromPathname("/src/components/headers")).toEqual("headers");
  });
});
