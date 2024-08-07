/**
 * 存储接口
 */
export interface Storage extends globalThis.Storage {
    /**
     * 设置存储值
     * @param key 存储键
     * @param value 存储值
     */
    set(key: string, value: any): void;
    /**
     * 获取存储值
     * @param key 存储键
     * @returns 存储值
     */
    get(key: string): any;
    /**
     * 删除存储值
     * @param key 存储键
     */
    remove(key: string): void;
}
/**
 * 使用sessionStorage存储数据
 * @param key - 存储的键名
 * @param value - 存储的值
 */
export declare const useSessionStorage: Storage;
/**
 * 使用localStorage存储数据
 * @param key - 存储的键名
 * @param value - 存储的值
 */
export declare const useLocalStorage: Storage;
