import { version } from "../modules/index";
test("当前项目版本为 1.0.0", () => {
  expect(version).toBe("1.0.0");
});

import { TimeTools } from "../modules/index";
let formatTime = TimeTools.formatTime;
describe("formatTime", () => {
  it("formats date to yyyy-MM-dd by default", () => {
    const date = new Date("2022-01-01T00:00:00Z").getTime();
    const result = formatTime(date);
    expect(result).toBe("2022-01-01");
  });

  it("formats date with custom format", () => {
    const date = new Date("2022-01-01T00:00:00Z").getTime();
    const result = formatTime(date, "MM-dd-yyyy");
    expect(result).toBe("01-01-2022");
  });

  it("formats date with time", () => {
    const date = new Date("2022-01-01T12:30:45Z").getTime();
    const result = formatTime(date, "yyyy-MM-dd hh:mm:ss");
    expect(result).toBe("2022-01-01 20:30:45");
  });

  it("ignores unknown tokens in format", () => {
    const date = new Date("2022-01-01T00:00:00Z").getTime();
    const result = formatTime(date, "yyyy-MM-dd unknown");
    expect(result).toBe("2022-01-01 unknown");
  });
});
