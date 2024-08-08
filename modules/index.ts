/**
 * 当前函数库版本
 */
const version: string = require("../package.json").version;

export { version };

export { useLocalStorage, useSessionStorage } from "./cache";
export { TimeTools } from "./time";

export { BaseTools } from "./base";
