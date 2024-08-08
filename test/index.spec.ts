import { TimeTools, version } from "../modules/index";
test("当前项目版本为 1.0.0", () => {
  expect(version).toBe("1.0.0");
});
