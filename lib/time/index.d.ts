type formatType = string;
export declare class TimeTools {
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
    static formatTime(date: number | Date, format?: formatType): string;
    /**
     * 获取当前月的第一天
     *
     * 此方法通过创建一个新的Date对象来实现，该对象被设置为当前年的同一个月的第一天
     * 使用`new Date().getFullYear()`和`new Date().getMonth()`来获取当前年份和月份
     * 第二个参数为月份索引，由于JavaScript中月份索引从0开始，所以需要使用`new Date().getMonth()`来获取当前月份索引
     * 第三个参数为该月的第一天，因此使用1
     *
     * @returns {string} 返回一个表示当前月第一天的Date对象
     */
    static getFirstDayOfMonth(): string;
    /**
     * 获取当前年的第一天
     *
     * 此方法用于统一获取当前年份的起始日期，即1月1日
     * 通过创建一个Date对象并设置其年份为当前年份，月份为0（表示1月），日期为1，
     * 我们可以确保无论何时调用此方法，都能获取到正确的当前年的第一天
     *
     * @returns {string} 当前年的第一天的Date对象
     */
    static getFirstDayOfYear(): string;
    /**
     * 获取指定月份的最后一天
     *
     * 此方法用于确定给定月份的最后一天，它通过创建一个新的Date实例来实现
     * 该Date实例被初始化为下个月的第一天，但是年份和月份来自于当前的日期对象
     * 然后将日期设置为0，这样就得到了上个月的最后一天
     *
     * @returns {string} 返回一个表示指定月份最后一天的Date对象
     */
    static getLastDayOfMonth(): string;
    /**
     * 获取本年的最后一天的日期对象
     *
     * 此方法通过创建一个新的Date对象来实现，该Date对象代表当前年份的12月31日
     * 由于JavaScript的Date对象在月份的表示上是从0开始的，因此使用11表示12月
     * 而日期部分使用31来确保得到的是12月的最后一天
     *
     * @returns {string} 返回一个代表本年最后一天的Date对象
     */
    static getLastDayOfYear(): string;
    /**
     * 获取当前周的所有日期
     *
     * 此静态方法用于生成一个包含当前周每一天的数组
     * 如果当前天是周日，则将数组的起始日期设置为前一天（周六），
     * 然后按顺序添加接下来的六天
     *
     * @returns {Date[]} 返回一个包含当前周每一天的日期对象数组
     */
    static getWeeks(): string[];
    /**
     * 获取本周的第一天的日期
     *
     * 此方法通过获取周数据数组的第一周信息来计算得出本周的第一天
     *
     * @returns {string} 返回本周第一天的日期对象
     */
    static getFirstDayOfWeek(): string;
    /**
     * 获取本周的最后一天的日期
     *
     * 此方法通过获取周数数组中的最后一个元素来确定本周的最后一天
     * 周数数组是由`TimeTools.getWeeks()`方法生成的，该方法似乎返回一个包含周数据的数组
     *
     * @returns {string} 本周的最后一天的日期对象
     */
    static getLastDayOfWeek(): string;
    /**
     * 获取指定月份的总天数
     *
     * 此方法通过获取月份的最后一天的日期来确定该月的总天数
     * 之所以这样做，是因为直接获取月份的总天数在JavaScript/TypeScript中并不是一件直观的事情
     * 通过获取最后一天的日期，可以简单地返回该日期的值，即为月份的总天数
     *
     * @returns {number} 指定月份的总天数
     */
    static getTotalDaysOfMonth(): number;
    /**
     * 判断给定的时间是否为闰年
     *
     * 如果没有提供参数，或者参数是无效的日期字符串，则函数会使用当前日期进行判断
     *
     * @param time 可选参数，可以是一个Date对象或一个日期字符串如果未提供，将使用当前日期
     * @returns 返回一个布尔值，如果年份是闰年则为true，否则为false
     */
    static isLeapYear(data?: Date | string): boolean;
    /**
     * 根据给定的时间获取对应的生肖
     * 如果没有提供时间，则使用当前时间
     * @param time 可选参数，可以是一个Date对象或一个表示时间的字符串
     * @returns 返回与给定时间对应的生肖字符串
     * @throws 如果提供的time参数不是一个有效的日期，则抛出错误
     *
     * 此方法通过计算给定年份与1900年的差值除以12的余数，
     * 来确定该年份对应的生肖在中国传统的十二生肖周期中是哪一个。
     *
     * 为什么选择1900年作为起始年份：
     * 1900年的生肖为鼠，方便计算余数对应的生肖。
     *
     * 为什么抛出错误而不是返回一个空字符串或null：
     * 为了遵循“失败快”的原则，尽早地通知调用者存在问题，而不是静默地失败。
     */
    static getAnimalOfYear(time?: Date | string): string;
}
export {};
