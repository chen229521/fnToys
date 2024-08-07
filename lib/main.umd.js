(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@iwowen/utils"] = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
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

    /**
     * 当前函数库版本
     */
    var version = require("../package.json").version;

    exports.useLocalStorage = useLocalStorage;
    exports.useSessionStorage = useSessionStorage;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
