"use strict";
/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathToFunc = void 0;
const hasOwn = Object.prototype.hasOwnProperty;
function pathToFunc(pathPattern, options) {
    const paramRE = /\{([a-zA-Z0-9_]+?)\}/g;
    return function buildURLPath(params = {}) {
        return pathPattern.replace(paramRE, function (_, placeholder) {
            if (!hasOwn.call(params, placeholder)) {
                throw new Error(`Parameter '${placeholder}' is required`);
            }
            const value = params[placeholder];
            if (typeof value !== "string" && typeof value !== "number") {
                throw new Error(`Parameter '${placeholder}' must be a string or number`);
            }
            return options?.charEncoding === "percent"
                ? encodeURIComponent(`${value}`)
                : `${value}`;
        });
    };
}
exports.pathToFunc = pathToFunc;
//# sourceMappingURL=url.js.map