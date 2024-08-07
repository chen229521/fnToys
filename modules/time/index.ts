type formatType = string;

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
  static formatTime(
    date: number | Date,
    format: formatType = "yyyy-MM-dd"
  ): string {
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

  /**
   * 获取当前月的第一天
   *
   * 此方法通过创建一个新的Date对象来实现，该对象被设置为当前年的同一个月的第一天
   * 使用`new Date().getFullYear()`和`new Date().getMonth()`来获取当前年份和月份
   * 第二个参数为月份索引，由于JavaScript中月份索引从0开始，所以需要使用`new Date().getMonth()`来获取当前月份索引
   * 第三个参数为该月的第一天，因此使用1
   *
   * @returns {Date} 返回一个表示当前月第一天的Date对象
   */
  static getFirstDayOfMonth(): Date {
    let data = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    return data;
  }

  /**
   * 获取当前年的第一天
   *
   * 此方法用于统一获取当前年份的起始日期，即1月1日
   * 通过创建一个Date对象并设置其年份为当前年份，月份为0（表示1月），日期为1，
   * 我们可以确保无论何时调用此方法，都能获取到正确的当前年的第一天
   *
   * @returns {Date} 当前年的第一天的Date对象
   */
  static getFirstDayOfYear(): Date {
    let data = new Date(new Date().getFullYear(), 0, 1);
    return data;
  }
  /**
   * 获取指定月份的最后一天
   *
   * 此方法用于确定给定月份的最后一天，它通过创建一个新的Date实例来实现
   * 该Date实例被初始化为下个月的第一天，但是年份和月份来自于当前的日期对象
   * 然后将日期设置为0，这样就得到了上个月的最后一天
   *
   * @returns {Date} 返回一个表示指定月份最后一天的Date对象
   */
  static getLastDayOfMonth(): Date {
    // 创建一个新的Date实例，初始化为下个月的第一天，但年份和月份基于当前日期
    let data = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    // 返回上个月的最后一天
    return data;
  }

  /**
   * 获取本年的最后一天的日期对象
   *
   * 此方法通过创建一个新的Date对象来实现，该Date对象代表当前年份的12月31日
   * 由于JavaScript的Date对象在月份的表示上是从0开始的，因此使用11表示12月
   * 而日期部分使用31来确保得到的是12月的最后一天
   *
   * @returns {Date} 返回一个代表本年最后一天的Date对象
   */
  static getLastDayOfYear(): Date {
    let data = new Date(new Date().getFullYear(), 11, 31);
    return data;
  }

  /**
   * 获取当前周的所有日期
   *
   * 此静态方法用于生成一个包含当前周每一天的数组
   * 如果当前天是周日，则将数组的起始日期设置为前一天（周六），
   * 然后按顺序添加接下来的六天
   *
   * @returns {Date[]} 返回一个包含当前周每一天的日期对象数组
   */
  static getWeeks(): Date[] {
    // 初始化一个空数组，用于存储每周的日期
    let week: Date[] = [];
    // 获取当前日期
    let currentDate = new Date();
    // 获取当前日期的星期几，0表示周日
    let day = currentDate.getDay();
    // 如果今天是周日，设置日期为上周六
    if (day === 0) {
      currentDate.setDate(currentDate.getDate() - 6);
    } else {
      // 否则，设置日期为本周的周一
      currentDate.setDate(currentDate.getDate() - day + 1);
    }
    // 将周一添加到数组中
    week.push(currentDate);
    // 循环添加周二到周日到数组中
    for (let i = 0; i < 6; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      week.push(currentDate);
    }
    // 返回包含一周日期的数组
    return week;
  }

  /**
   * 获取本周的第一天的日期
   *
   * 此方法通过获取周数据数组的第一周信息来计算得出本周的第一天
   *
   * @returns {Date} 返回本周第一天的日期对象
   */
  static getFirstDayOfWeek(): Date {
    let data = this.getWeeks()[0];
    return data;
  }

  /**
   * 获取本周的最后一天的日期
   *
   * 此方法通过获取周数数组中的最后一个元素来确定本周的最后一天
   * 周数数组是由`this.getWeeks()`方法生成的，该方法似乎返回一个包含周数据的数组
   *
   * @returns {Date} 本周的最后一天的日期对象
   */
  static getLastDayOfWeek(): Date {
    // 从周数数组中获取最后一个星期的数据，即本周的最后一天
    let data = this.getWeeks()[6];
    // 返回本周的最后一天的日期
    return data;
  }
}
