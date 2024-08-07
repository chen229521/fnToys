import { version } from "../modules/index";
import { TimeTools } from "../lib/main.umd";
test("当前项目版本为 1.0.0", () => {
  expect(version).toBe("1.0.0");
});
