import { _DataType } from "../utils";
export declare class BaseTools {
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
    static debounce(fn: Function, time?: number, immediate?: boolean): (this: any, ...args: any[]) => void;
    /**
     * 节流函数生成器
     * 用于控制函数的执行频率，使其在规定时间内只能执行一次
     *
     * @param fn 需要被节流的函数
     * @param time 节流的时间间隔，默认为1000毫秒
     * @param immediate 是否在第一次调用时立即执行函数，默认为false
     * @returns 返回一个新的节流函数
     */
    static throttle(fn: Function, time?: number, immediate?: boolean): (...args: any) => void;
    /**
     * 将路径格式的字符串转换为驼峰命名法
     *
     * 该方法主要用于将URL路径转换为驼峰命名法，以便在前端框架中使用
     * 例如，将'/get-data'转换为'getdata'
     *
     * @param path 输入的路径字符串，应以'/'为分隔符
     * @returns 返回转换后的驼峰命名法字符串
     */
    static pathToCamel(path: string): string;
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
    static isType<T>(type: _DataType, obj: T): boolean;
    /**
     * 深拷贝一个对象或数据结构
     * @param obj 要深拷贝的对象或数据结构
     * @param cache 用于缓存已经拷贝过的对象，避免循环引用导致的无限递归
     * @returns 返回深拷贝后的对象或数据结构
     */
    static deepClone<T>(obj: T, cache?: WeakMap<object, any>): any;
}
