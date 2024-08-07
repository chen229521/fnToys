(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@iwowen/utils"] = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * 使用全局存储对象的存储方法
     * @param storage 存储对象
     * @returns 存储对象的包装方法
     */
    var useStorage = function (storage) {
        return __assign(__assign({}, storage), { 
            /**
             * 设置存储值
             * @param key 存储键
             * @param value 存储值
             */
            set: function (key, value) {
                if (typeof value !== "string") {
                    value = JSON.stringify(value);
                }
                storage.setItem(key, value);
            }, 
            /**
             * 获取存储值
             * @param key 存储键
             * @returns 存储值
             */
            get: function (key) {
                var data = storage.getItem(key);
                if (data) {
                    try {
                        return JSON.parse(data);
                    }
                    catch (e) {
                        return data;
                    }
                }
            }, 
            /**
             * 删除存储值
             * @param key 存储键
             */
            remove: function (key) {
                storage.removeItem(key);
            } });
    };
    /**
     * 使用sessionStorage存储数据
     * @param key - 存储的键名
     * @param value - 存储的值
     */
    var useSessionStorage = useStorage(globalThis.sessionStorage);
    /**
     * 使用localStorage存储数据
     * @param key - 存储的键名
     * @param value - 存储的值
     */
    var useLocalStorage = useStorage(globalThis.localStorage);

    var isValidDate = function (date) {
        return date instanceof Date && !isNaN(date.getTime());
    };
    var TimeTools = /** @class */ (function () {
        function TimeTools() {
        }
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
        TimeTools.formatTime = function (date, format) {
            if (format === void 0) { format = "yyyy-MM-dd"; }
            // 创建Date对象，用于获取时间的各个部分
            var data = new Date(date);
            if (!isValidDate(data)) {
                throw new Error("无效的日期");
            }
            // 获取年份
            var year = data.getFullYear();
            // 获取月份，月份从0开始，所以需要加1，不足两位前面补0
            var month = ("0" + (data.getMonth() + 1)).slice(-2);
            // 获取日期，不足两位前面补0
            var day = ("0" + data.getDate()).slice(-2);
            // 获取小时，不足两位前面补0
            var hours = ("0" + data.getHours()).slice(-2);
            // 获取分钟，不足两位前面补0
            var minutes = ("0" + data.getMinutes()).slice(-2);
            // 获取秒，不足两位前面补0
            var seconds = ("0" + data.getSeconds()).slice(-2);
            // 初始化格式化后的字符串
            var formatted = "";
            // 替换格式中的年、月、日部分
            formatted = format
                .replace(/yyyy/g, year.toString())
                .replace(/MM/g, month)
                .replace(/dd/g, day);
            // 检查格式是否包含时间部分
            var flag = format.split(" ");
            if (flag && flag.length > 1) {
                // 替换格式中的时、分、秒部分
                formatted = formatted
                    .replace(/hh/g, hours)
                    .replace(/mm/g, minutes)
                    .replace(/ss/g, seconds);
            }
            // 返回格式化后的时间字符串
            return formatted;
        };
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
        TimeTools.getFirstDayOfMonth = function () {
            var data = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            return data;
        };
        /**
         * 获取当前年的第一天
         *
         * 此方法用于统一获取当前年份的起始日期，即1月1日
         * 通过创建一个Date对象并设置其年份为当前年份，月份为0（表示1月），日期为1，
         * 我们可以确保无论何时调用此方法，都能获取到正确的当前年的第一天
         *
         * @returns {Date} 当前年的第一天的Date对象
         */
        TimeTools.getFirstDayOfYear = function () {
            var data = new Date(new Date().getFullYear(), 0, 1);
            return data;
        };
        /**
         * 获取指定月份的最后一天
         *
         * 此方法用于确定给定月份的最后一天，它通过创建一个新的Date实例来实现
         * 该Date实例被初始化为下个月的第一天，但是年份和月份来自于当前的日期对象
         * 然后将日期设置为0，这样就得到了上个月的最后一天
         *
         * @returns {Date} 返回一个表示指定月份最后一天的Date对象
         */
        TimeTools.getLastDayOfMonth = function () {
            // 创建一个新的Date实例，初始化为下个月的第一天，但年份和月份基于当前日期
            var data = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
            // 返回上个月的最后一天
            return data;
        };
        /**
         * 获取本年的最后一天的日期对象
         *
         * 此方法通过创建一个新的Date对象来实现，该Date对象代表当前年份的12月31日
         * 由于JavaScript的Date对象在月份的表示上是从0开始的，因此使用11表示12月
         * 而日期部分使用31来确保得到的是12月的最后一天
         *
         * @returns {Date} 返回一个代表本年最后一天的Date对象
         */
        TimeTools.getLastDayOfYear = function () {
            var data = new Date(new Date().getFullYear(), 11, 31);
            return data;
        };
        /**
         * 获取当前周的所有日期
         *
         * 此静态方法用于生成一个包含当前周每一天的数组
         * 如果当前天是周日，则将数组的起始日期设置为前一天（周六），
         * 然后按顺序添加接下来的六天
         *
         * @returns {Date[]} 返回一个包含当前周每一天的日期对象数组
         */
        TimeTools.getWeeks = function () {
            // 初始化一个空数组，用于存储每周的日期
            var week = [];
            // 获取当前日期
            var currentDate = new Date();
            // 获取当前日期的星期几，0表示周日
            var day = currentDate.getDay();
            // 如果今天是周日，设置日期为上周六
            if (day === 0) {
                currentDate.setDate(currentDate.getDate() - 6);
            }
            else {
                // 否则，设置日期为本周的周一
                currentDate.setDate(currentDate.getDate() - day + 1);
            }
            // 将周一添加到数组中
            week.push(currentDate);
            // 循环添加周二到周日到数组中
            for (var i = 0; i < 6; i++) {
                currentDate.setDate(currentDate.getDate() + 1);
                week.push(currentDate);
            }
            // 返回包含一周日期的数组
            return week;
        };
        /**
         * 获取本周的第一天的日期
         *
         * 此方法通过获取周数据数组的第一周信息来计算得出本周的第一天
         *
         * @returns {Date} 返回本周第一天的日期对象
         */
        TimeTools.getFirstDayOfWeek = function () {
            var data = TimeTools.getWeeks()[0];
            return data;
        };
        /**
         * 获取本周的最后一天的日期
         *
         * 此方法通过获取周数数组中的最后一个元素来确定本周的最后一天
         * 周数数组是由`TimeTools.getWeeks()`方法生成的，该方法似乎返回一个包含周数据的数组
         *
         * @returns {Date} 本周的最后一天的日期对象
         */
        TimeTools.getLastDayOfWeek = function () {
            // 从周数数组中获取最后一个星期的数据，即本周的最后一天
            var data = TimeTools.getWeeks()[6];
            // 返回本周的最后一天的日期
            return data;
        };
        /**
         * 获取指定月份的总天数
         *
         * 此方法通过获取月份的最后一天的日期来确定该月的总天数
         * 之所以这样做，是因为直接获取月份的总天数在JavaScript/TypeScript中并不是一件直观的事情
         * 通过获取最后一天的日期，可以简单地返回该日期的值，即为月份的总天数
         *
         * @returns {number} 指定月份的总天数
         */
        TimeTools.getTotalDaysOfMonth = function () {
            var data = TimeTools.getLastDayOfMonth().getDate();
            return data;
        };
        /**
         * 判断给定的时间是否为闰年
         *
         * 如果没有提供参数，或者参数是无效的日期字符串，则函数会使用当前日期进行判断
         *
         * @param time 可选参数，可以是一个Date对象或一个日期字符串如果未提供，将使用当前日期
         * @returns 返回一个布尔值，如果年份是闰年则为true，否则为false
         */
        TimeTools.isLeapYear = function (data) {
            // 将参数time赋值为新创建的Date对象，如果原time为字符串，则用该字符串创建Date对象
            var time = data ? new Date() : new Date(data);
            // 检查time是否为有效日期，如果是无效日期则直接返回false
            if (!isValidDate(time)) {
                return false;
            }
            // 判断是否为闰年并返回结果
            return ((time.getFullYear() % 4 === 0 && time.getFullYear() % 100 !== 0) ||
                time.getFullYear() % 400 === 0);
        };
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
        TimeTools.getAnimalOfYear = function (time) {
            // 如果提供了time参数，则使用它创建一个新的Date对象；否则，使用当前时间
            var data = time ? new Date(time) : new Date();
            // 检查日期是否有效，如果无效则抛出错误
            if (!isValidDate(data)) {
                throw new Error("无效的日期");
            }
            // 获取年份
            var year = data.getFullYear();
            // 定义起始年份为1900年，因为1900年是鼠年，方便计算
            var defaultYear = 1900;
            // 计算距起始年份的差值除以12的余数，用于确定生肖
            var remainYear = (year - defaultYear) % 12;
            // 定义十二生肖数组
            var animals = [
                "鼠",
                "牛",
                "虎",
                "兔",
                "龙",
                "蛇",
                "马",
                "羊",
                "猴",
                "鸡",
                "狗",
                "猪",
            ];
            // 返回对应的生肖
            return animals[remainYear];
        };
        return TimeTools;
    }());

    /**
     * 当前函数库版本
     */
    var version = require("../package.json").version;

    exports.TimeTools = TimeTools;
    exports.useLocalStorage = useLocalStorage;
    exports.useSessionStorage = useSessionStorage;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
