import { DataType, _DataType } from "../utils";
export class BaseTools {
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
  static debounce(
    fn: Function,
    time: number = 1000,
    immediate: boolean = false
  ) {
    // 定时器变量，用于存储setTimeout的返回值，以便后续清除定时器
    let timer: NodeJS.Timeout | null = null;
    // 返回一个新的函数，用于实现防抖逻辑
    return function (this: any, ...args: any[]) {
      // 如果存在活跃的定时器，则清除它，以确保不会执行上一次的延迟调用
      if (timer) clearTimeout(timer);
      // 如果设置了immediate参数为true，则根据定时器的状态决定是否立即调用函数
      if (immediate) {
        // 记录是否应该立即调用函数
        let callNow = !timer;
        // 设置一个新的定时器，用于在指定时间后清除当前的定时器状态
        timer = setTimeout(() => {
          timer = null;
        }, time);
        // 如果应该立即调用，则执行函数
        if (callNow) fn.apply(this, args);
      } else {
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
  static throttle(
    fn: Function,
    time: number = 1000,
    immediate: boolean = false
  ) {
    if (immediate) {
      let prevTime = 0;
      return (...args: any) => {
        let nowTime = Date.now();
        if (nowTime - prevTime >= time) {
          fn.apply(this, args);
          prevTime = nowTime;
        }
      };
    } else {
      let timer: NodeJS.Timeout | null;
      return (...args: any) => {
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
  static pathToCamel(path: string): string {
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
  static isType<T>(type: _DataType, obj: T) {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
  }

  /**
   * 深拷贝一个对象或数据结构
   * @param obj 要深拷贝的对象或数据结构
   * @param cache 用于缓存已经拷贝过的对象，避免循环引用导致的无限递归
   * @returns 返回深拷贝后的对象或数据结构
   */
  static deepClone<T>(obj: T, cache = new WeakMap()) {
    // 如果不是对象或者是null，直接返回（终止条件）
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    // 如果类型是Symbol，直接返回一个新的Symbol
    if (BaseTools.isType(DataType.Symbol, obj)) {
      return obj.constructor((obj as unknown as Symbol).description);
    }
    // 如果已经缓存过，直接返回缓存的值
    if (cache.has(obj)) {
      return cache.get(obj);
    }

    // 初始化返回结果
    let temp: T, param: T;
    // 如果是日期对象，直接返回一个新的日期对象
    if (
      BaseTools.isType(DataType.Date, obj) ||
      BaseTools.isType(DataType.RegExp, obj)
    ) {
      param = obj;
    }
    // @ts-ignore
    temp = new obj!.constructor(param);
    // 如果是数组或者对象，需要遍历
    if (
      BaseTools.isType(DataType.Array, obj) ||
      BaseTools.isType(DataType.Object, obj)
    ) {
      Object.keys(obj).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
          temp[key] = BaseTools.deepClone(obj[key], cache);
        }
      });
    }
    // 如果是Set
    if (BaseTools.isType(DataType.Set, obj)) {
      for (let value of obj as unknown as Set<T>) {
        (temp as Set<T>).add(BaseTools.deepClone(value, cache));
      }
    }
    // 如果是Map
    if (BaseTools.isType(DataType.Map, obj)) {
      for (let [key, value] of obj as unknown as Map<T, T>) {
        (temp as Map<T, T>).set(
          BaseTools.deepClone(key, cache),
          BaseTools.deepClone(value, cache)
        );
      }
    }
    // 缓存值
    cache.set(obj, temp);
    return temp;
  }
}
