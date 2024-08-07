import { version } from "../modules/index";
test("当前项目版本为 1.0.0", () => {
  expect(version).toBe("1.0.0");
});

import { TimeTools } from "../modules/index";
let formatTime = TimeTools.formatTime;
let getFirstDayOfMonth = TimeTools.getFirstDayOfMonth;
let getTotalDaysOfMonth = TimeTools.getTotalDaysOfMonth;
let getAnimalOfYear = TimeTools.getAnimalOfYear;
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

describe("getFirstDayOfMonth", () => {
  it("should return the first day of the current month", () => {
    const firstDayOfMonth = getFirstDayOfMonth();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    expect(firstDayOfMonth.getDate()).toBe(1);
    expect(firstDayOfMonth.getMonth()).toBe(currentMonth);
    expect(firstDayOfMonth.getFullYear()).toBe(currentYear);
  });
});

describe("MyClass.getTotalDaysOfMonth", () => {
  test("should return the total number of days in the month", () => {
    // Call the static method
    const totalDays = getTotalDaysOfMonth();

    // Assert the result
    expect(totalDays).toBe(31);
  });

  //生肖测试类
  describe("getAnimalOfYear", () => {
    //测试当前年份的生肖
    it("should return the correct animal for the current year", () => {
      const currentYear = new Date().getFullYear();
      const expectedAnimal = getAnimalOfYear(); // YourClass需替换为实际的类名
      const calculatedAnimal = getAnimalOfYear(new Date(currentYear, 0, 1));
      expect(calculatedAnimal).toBe(expectedAnimal);
    });

    //测试历史年份的生肖
    it("should return the correct animal for historical years", () => {
      const testCases = [
        { year: 1900, animal: "鼠" },
        { year: 1985, animal: "牛" },
        { year: 1995, animal: "猪" },
        // 更多测试用例...
      ];

      testCases.forEach(({ year, animal }) => {
        const calculatedAnimal = getAnimalOfYear(new Date(year, 0, 1));
        expect(calculatedAnimal).toBe(animal);
      });
    });

    //测试无效日期抛出错误
    it("should throw an error for invalid dates", () => {
      expect(() => {
        getAnimalOfYear("invalid-date");
      }).toThrow("无效的日期");
    });
  });
});
