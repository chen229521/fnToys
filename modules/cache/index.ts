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
 * 使用全局存储对象的存储方法
 * @param storage 存储对象
 * @returns 存储对象的包装方法
 */
const useStorage = (storage: globalThis.Storage): Storage => {
  return {
    ...storage,
    /**
     * 设置存储值
     * @param key 存储键
     * @param value 存储值
     */
    set(key: string, value: any) {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }

      storage.setItem(key, value as string);
    },
    /**
     * 获取存储值
     * @param key 存储键
     * @returns 存储值
     */
    get(key: string): any {
      const data = storage.getItem(key) as string;
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          return data;
        }
      }
    },
    /**
     * 删除存储值
     * @param key 存储键
     */
    remove(key: string): void {
      storage.removeItem(key);
    },
  };
};

/**
 * 使用sessionStorage存储数据
 * @param key - 存储的键名
 * @param value - 存储的值
 */
export const useSessionStorage = useStorage(globalThis.sessionStorage);

/**
 * 使用localStorage存储数据
 * @param key - 存储的键名
 * @param value - 存储的值
 */
export const useLocalStorage = useStorage(globalThis.localStorage);
