const assert = require("power-assert");
const {exec} = require("..");
const testConfig = require("./fixture/perf.config.js");


describe("collect perf", () => {
  it("runs with no error", () => {
    return exec(testConfig).then(() => assert(true));
  });
});