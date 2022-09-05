import { getParamFromPathname } from "./params.util";

describe("Params Util", () => {
    it("getParamFromPathName should return empty string for base pathname", () => {
        expect(getParamFromPathname("/")).toEqual("");
    });

    it("getParamFromPathName should return param as `src` when pathname is `/src`", () => {
        expect(getParamFromPathname("/src")).toEqual("src");
    });

    it("getParamFromPathName should return param as `components` when pathname is `/src/components`", () => {
        expect(getParamFromPathname("/src/components")).toEqual("components");
    });
});
