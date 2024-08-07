type formatType =
  | "yyyy-MM-dd"
  | "yyyy-MM-dd hh:mm:ss"
  | "MM-dd-yyyy"
  | "yyyy-MM-dd unknown";

// const extractOperator = (str: string) => {
//   // 使用正则表达式匹配数字+符号+数字的模式
//   const regex = /^(\d+)([+\-*/])(\d+)([+\-*/])(\d+)$/;
//   const match = str.match(regex);

//   if (match) {
//     // 如果匹配成功，match数组的索引1就是运算符号
//     return match[2];
//   } else {
//     // 如果没有匹配到合适的格式，则返回null或抛出错误
//     return null;
//   }
// };
export class TimeTools {
  /**
   * 格式化时间
   *
   * @param date - 需要格式化的时间，可以是时间戳
   * @param format - 时间格式，默认为"yyyy-MM-dd"，可以包含年、月、日、时、分、秒的格式占位符
   * @returns 格式化后的时间字符串
   *
   * 占位符说明：
   * - yyyy: 年份
   * - MM: 月份（两位数，不足两位前面补0）
   * - dd: 日期（两位数，不足两位前面补0）
   * - hh: 小时（两位数，不足两位前面补0）
   * - mm: 分钟（两位数，不足两位前面补0）
   * - ss: 秒（两位数，不足两位前面补0）
   *
   * 示例：
   * formatTime(1609459200000) // 返回 "2021-01-01"
   * formatTime(1609459200000, "yyyy-MM-dd hh:mm:ss") // 返回 "2021-01-01 00:00:00"
   */
  static formatTime(date: number, format: formatType = "yyyy-MM-dd") {
    // 创建Date对象，用于获取时间的各个部分
    const data = new Date(date);
    // 获取年份
    const year = data.getFullYear();
    // 获取月份，月份从0开始，所以需要加1，不足两位前面补0
    const month = ("0" + (data.getMonth() + 1)).slice(-2);
    // 获取日期，不足两位前面补0
    const day = ("0" + data.getDate()).slice(-2);
    // 获取小时，不足两位前面补0
    const hours = ("0" + data.getHours()).slice(-2);
    // 获取分钟，不足两位前面补0
    const minutes = ("0" + data.getMinutes()).slice(-2);
    // 获取秒，不足两位前面补0
    const seconds = ("0" + data.getSeconds()).slice(-2);
    // 初始化格式化后的字符串
    let formatted = "";
    // 替换格式中的年、月、日部分
    formatted = format
      .replace(/yyyy/g, year.toString())
      .replace(/MM/g, month)
      .replace(/dd/g, day);
    // 检查格式是否包含时间部分
    let flag = format.split(" ");
    if (flag && flag.length > 1) {
      // 替换格式中的时、分、秒部分
      formatted = formatted
        .replace(/hh/g, hours)
        .replace(/mm/g, minutes)
        .replace(/ss/g, seconds);
    }
    // 返回格式化后的时间字符串
    return formatted;
  }
}
