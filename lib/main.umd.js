(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fntoys = {}));
})(this, (function (exports) { 'use strict';

  /**
   * 使用全局存储对象的存储方法
   * @param storage 存储对象
   * @returns 存储对象的包装方法
   */
  const useStorage = (storage) => {
      return Object.assign(Object.assign({}, storage), { 
          /**
           * 设置存储值
           * @param key 存储键
           * @param value 存储值
           */
          set(key, value) {
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
          get(key) {
              const data = storage.getItem(key);
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
          remove(key) {
              storage.removeItem(key);
          } });
  };
  /**
   * 使用sessionStorage存储数据
   * @param key - 存储的键名
   * @param value - 存储的值
   */
  const useSessionStorage = useStorage(globalThis.sessionStorage);
  /**
   * 使用localStorage存储数据
   * @param key - 存储的键名
   * @param value - 存储的值
   */
  const useLocalStorage = useStorage(globalThis.localStorage);

  const isValidDate = (date) => {
      return date instanceof Date && !isNaN(date.getTime());
  };
  class TimeTools {
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
      static formatTime(date, format = "yyyy-MM-dd") {
          // 创建Date对象，用于获取时间的各个部分
          const data = new Date(date);
          if (!isValidDate(data)) {
              throw new Error("无效的日期");
          }
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
       * @returns {string} 返回一个表示当前月第一天的Date对象
       */
      static getFirstDayOfMonth() {
          let data = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
          return TimeTools.formatTime(data);
      }
      /**
       * 获取当前年的第一天
       *
       * 此方法用于统一获取当前年份的起始日期，即1月1日
       * 通过创建一个Date对象并设置其年份为当前年份，月份为0（表示1月），日期为1，
       * 我们可以确保无论何时调用此方法，都能获取到正确的当前年的第一天
       *
       * @returns {string} 当前年的第一天的Date对象
       */
      static getFirstDayOfYear() {
          let data = new Date(new Date().getFullYear(), 0, 1);
          return TimeTools.formatTime(data);
      }
      /**
       * 获取指定月份的最后一天
       *
       * 此方法用于确定给定月份的最后一天，它通过创建一个新的Date实例来实现
       * 该Date实例被初始化为下个月的第一天，但是年份和月份来自于当前的日期对象
       * 然后将日期设置为0，这样就得到了上个月的最后一天
       *
       * @returns {string} 返回一个表示指定月份最后一天的Date对象
       */
      static getLastDayOfMonth() {
          // 创建一个新的Date实例，初始化为下个月的第一天，但年份和月份基于当前日期
          let data = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
          // 返回上个月的最后一天
          return TimeTools.formatTime(data);
      }
      /**
       * 获取本年的最后一天的日期对象
       *
       * 此方法通过创建一个新的Date对象来实现，该Date对象代表当前年份的12月31日
       * 由于JavaScript的Date对象在月份的表示上是从0开始的，因此使用11表示12月
       * 而日期部分使用31来确保得到的是12月的最后一天
       *
       * @returns {string} 返回一个代表本年最后一天的Date对象
       */
      static getLastDayOfYear() {
          let data = new Date(new Date().getFullYear(), 11, 31);
          return TimeTools.formatTime(data);
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
      static getWeeks() {
          // 初始化一个空数组，用于存储每周的日期
          let week = [];
          // 获取当前日期
          let currentDate = new Date();
          // 获取当前日期的星期几，0表示周日
          let day = currentDate.getDay();
          // 如果今天是周日，设置日期为上周六
          if (day === 0) {
              currentDate.setDate(currentDate.getDate() - 6);
          }
          else {
              // 否则，设置日期为本周的周一
              currentDate.setDate(currentDate.getDate() - day + 1);
          }
          // 将周一添加到数组中
          week.push(TimeTools.formatTime(currentDate));
          // 循环添加周二到周日到数组中
          for (let i = 0; i < 6; i++) {
              currentDate.setDate(currentDate.getDate() + 1);
              week.push(TimeTools.formatTime(currentDate));
          }
          // 返回包含一周日期的数组
          return week;
      }
      /**
       * 获取本周的第一天的日期
       *
       * 此方法通过获取周数据数组的第一周信息来计算得出本周的第一天
       *
       * @returns {string} 返回本周第一天的日期对象
       */
      static getFirstDayOfWeek() {
          let data = TimeTools.getWeeks()[0];
          return data;
      }
      /**
       * 获取本周的最后一天的日期
       *
       * 此方法通过获取周数数组中的最后一个元素来确定本周的最后一天
       * 周数数组是由`TimeTools.getWeeks()`方法生成的，该方法似乎返回一个包含周数据的数组
       *
       * @returns {string} 本周的最后一天的日期对象
       */
      static getLastDayOfWeek() {
          // 从周数数组中获取最后一个星期的数据，即本周的最后一天
          let data = TimeTools.getWeeks()[6];
          // 返回本周的最后一天的日期
          return data;
      }
      /**
       * 获取指定月份的总天数
       *
       * 此方法通过获取月份的最后一天的日期来确定该月的总天数
       * 之所以这样做，是因为直接获取月份的总天数在JavaScript/TypeScript中并不是一件直观的事情
       * 通过获取最后一天的日期，可以简单地返回该日期的值，即为月份的总天数
       *
       * @returns {number} 指定月份的总天数
       */
      static getTotalDaysOfMonth() {
          let data = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
          return data;
      }
      /**
       * 判断给定的时间是否为闰年
       *
       * 如果没有提供参数，或者参数是无效的日期字符串，则函数会使用当前日期进行判断
       *
       * @param time 可选参数，可以是一个Date对象或一个日期字符串如果未提供，将使用当前日期
       * @returns 返回一个布尔值，如果年份是闰年则为true，否则为false
       */
      static isLeapYear(data) {
          // 将参数time赋值为新创建的Date对象，如果原time为字符串，则用该字符串创建Date对象
          let time = data ? new Date() : new Date(data);
          // 检查time是否为有效日期，如果是无效日期则直接返回false
          if (!isValidDate(time)) {
              return false;
          }
          // 判断是否为闰年并返回结果
          return ((time.getFullYear() % 4 === 0 && time.getFullYear() % 100 !== 0) ||
              time.getFullYear() % 400 === 0);
      }
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
      static getAnimalOfYear(time) {
          // 如果提供了time参数，则使用它创建一个新的Date对象；否则，使用当前时间
          const data = time ? new Date(time) : new Date();
          // 检查日期是否有效，如果无效则抛出错误
          if (!isValidDate(data)) {
              throw new Error("无效的日期");
          }
          // 获取年份
          const year = data.getFullYear();
          // 定义起始年份为1900年，因为1900年是鼠年，方便计算
          const defaultYear = 1900;
          // 计算距起始年份的差值除以12的余数，用于确定生肖
          const remainYear = (year - defaultYear) % 12;
          // 定义十二生肖数组
          const animals = [
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
      }
  }

  var DataType;
  (function (DataType) {
      DataType["Object"] = "Object";
      DataType["Array"] = "Array";
      DataType["Date"] = "Date";
      DataType["RegExp"] = "RegExp";
      DataType["Function"] = "Function";
      DataType["String"] = "String";
      DataType["Number"] = "Number";
      DataType["Boolean"] = "Boolean";
      DataType["Undefined"] = "Undefined";
      DataType["Null"] = "Null";
      DataType["Symbol"] = "Symbol";
      DataType["Set"] = "Set";
      DataType["Map"] = "Map";
  })(DataType || (DataType = {}));

  class BaseTools {
      /**
       * 实现函数防抖
       * 防抖是指在事件被触发后，不会立刻执行函数，而是等待指定的时间间隔
       * 如果在这段时间内事件再次被触发，则重新计时，只有当这段时间内没有新的触发时，函数才会执行
       * 这可以用于优化性能，减少因频繁操作而引起的不必要的计算或渲染
       *
       * @param fn 要防抖的函数
       * @param time 等待的时间间隔，以毫秒为单位，默认为1000毫秒
       * @param immediate 是否在第一次触发时立即执行函数，默认为false
       * @returns 返回一个新的防抖函数
       */
      static debounce(fn, time = 1000, immediate = false) {
          // 定时器变量，用于存储setTimeout的返回值，以便后续清除定时器
          let timer = null;
          // 返回一个新的函数，用于实现防抖逻辑
          return function (...args) {
              // 如果存在活跃的定时器，则清除它，以确保不会执行上一次的延迟调用
              if (timer)
                  clearTimeout(timer);
              // 如果设置了immediate参数为true，则根据定时器的状态决定是否立即调用函数
              if (immediate) {
                  // 记录是否应该立即调用函数
                  let callNow = !timer;
                  // 设置一个新的定时器，用于在指定时间后清除当前的定时器状态
                  timer = setTimeout(() => {
                      timer = null;
                  }, time);
                  // 如果应该立即调用，则执行函数
                  if (callNow)
                      fn.apply(this, args);
              }
              else {
                  // 如果没有设置immediate或为false，则在指定时间后调用函数
                  timer = setTimeout(() => {
                      fn.apply(this, args);
                  }, time);
              }
          };
      }
      /**
       * 节流函数生成器
       * 用于控制函数的执行频率，使其在规定时间内只能执行一次
       *
       * @param fn 需要被节流的函数
       * @param time 节流的时间间隔，默认为1000毫秒
       * @param immediate 是否在第一次调用时立即执行函数，默认为false
       * @returns 返回一个新的节流函数
       */
      static throttle(fn, time = 1000, immediate = false) {
          if (immediate) {
              let prevTime = 0;
              return (...args) => {
                  let nowTime = Date.now();
                  if (nowTime - prevTime >= time) {
                      fn.apply(this, args);
                      prevTime = nowTime;
                  }
              };
          }
          else {
              let timer;
              return (...args) => {
                  if (!timer) {
                      fn.apply(this, args);
                      timer = setTimeout(() => {
                          timer && clearTimeout(timer);
                          timer = null;
                      }, time);
                  }
              };
          }
      }
      /**
       * 将路径格式的字符串转换为驼峰命名法
       *
       * 该方法主要用于将URL路径转换为驼峰命名法，以便在前端框架中使用
       * 例如，将'/get-data'转换为'getdata'
       *
       * @param path 输入的路径字符串，应以'/'为分隔符
       * @returns 返回转换后的驼峰命名法字符串
       */
      static pathToCamel(path) {
          // 使用正则表达式替换路径中的'/'和它后面的字母
          // 将字母大写，然后返回替换后的字符串
          return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase());
      }
      /**
       * 判断给定对象是否为指定的类型
       *
       * 此静态方法通过比较对象的内部类型与指定类型是否匹配来判断
       * 它使用了`Object.prototype.toString.call(obj)`方法来获取对象的内部类型，然后通过比较其切片后的字符串（去除了前后缀）与指定类型的字符串是否一致来判断类型是否匹配
       *
       * @param type 指定的类型字符串，如"Array"、"String"等
       * @param obj 待检测的对象
       * @returns 如果对象的内部类型与指定类型匹配，则返回true；否则返回false
       */
      static isType(type, obj) {
          return Object.prototype.toString.call(obj).slice(8, -1) === type;
      }
      /**
       * 深拷贝一个对象或数据结构
       * @param obj 要深拷贝的对象或数据结构
       * @param cache 用于缓存已经拷贝过的对象，避免循环引用导致的无限递归
       * @returns 返回深拷贝后的对象或数据结构
       */
      static deepClone(obj, cache = new WeakMap()) {
          // 如果不是对象或者是null，直接返回（终止条件）
          if (typeof obj !== "object" || obj === null) {
              return obj;
          }
          // 如果类型是Symbol，直接返回一个新的Symbol
          if (BaseTools.isType(DataType.Symbol, obj)) {
              return obj.constructor(obj.description);
          }
          // 如果已经缓存过，直接返回缓存的值
          if (cache.has(obj)) {
              return cache.get(obj);
          }
          // 初始化返回结果
          let temp, param;
          // 如果是日期对象，直接返回一个新的日期对象
          if (BaseTools.isType(DataType.Date, obj) ||
              BaseTools.isType(DataType.RegExp, obj)) {
              param = obj;
          }
          // @ts-ignore
          temp = new obj.constructor(param);
          // 如果是数组或者对象，需要遍历
          if (BaseTools.isType(DataType.Array, obj) ||
              BaseTools.isType(DataType.Object, obj)) {
              Object.keys(obj).forEach((key) => {
                  if (obj.hasOwnProperty(key)) {
                      temp[key] = BaseTools.deepClone(obj[key], cache);
                  }
              });
          }
          // 如果是Set
          if (BaseTools.isType(DataType.Set, obj)) {
              for (let value of obj) {
                  temp.add(BaseTools.deepClone(value, cache));
              }
          }
          // 如果是Map
          if (BaseTools.isType(DataType.Map, obj)) {
              for (let [key, value] of obj) {
                  temp.set(BaseTools.deepClone(key, cache), BaseTools.deepClone(value, cache));
              }
          }
          // 缓存值
          cache.set(obj, temp);
          return temp;
      }
  }

  exports.BaseTools = BaseTools;
  exports.TimeTools = TimeTools;
  exports.useLocalStorage = useLocalStorage;
  exports.useSessionStorage = useSessionStorage;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
