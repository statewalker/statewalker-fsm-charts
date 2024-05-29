// export function constant(value) {
//   return function () {
//     return value;
//   };
// }
// export function clone(obj) {
//   return Object.assign({}, obj, {});
//   // return JSON.parse(JSON.stringify(obj));
// }

// export const cloneDeep = clone;
// export function defaults(...list) {
//   const result = {};
//   for (const obj of list) {
//     for (const [key, value] of Object.entries(obj)) {
//       if (!(key in result)) {
//         result[key] = value;
//       }
//     }
//   }
//   return result;
// }
// export function forEach(array, action) {
//   if (Array.isArray(array)) array.forEach(action);
//   else Object.entries(([key, value]) => action(value, key));
// }
// export const each = forEach;
// export function find(list, check) {
//   const idx = list.indexOf(check);
//   return idx >= 0 ? list[idx] : undefined;
// }
// export function filter(list, accept) {
//   return list.filter(accept);
// }
// // export function flatten(list, accept) {
// //   return list.flatten(accept);
// // }
// // export function forIn(obj, action) {
// //   for (const [key, value] of Object.entries(obj)) {
// //     if (action(value, key, obj) === false) break;
// //   }
// // }
// // export function forOwn(obj, action) {
// //   for (const [key, value] of Object.entries(obj)) {
// //     if (!Object.hasOwnProperty(key)) continue;
// //     if (action(value, key, obj) === false) break;
// //   }
// // }
// export function has(obj, field) {
//   return field in obj;
// }
// export function isArray(obj) {
//   return Array.isArray(obj);
// }
// export function isEmpty(obj) {
//   if (typeof obj !== "object") return true;
//   if (obj === null || obj === undefined) return true;
//   if (isArray(obj)) return obj.length === 0;
//   return Object.keys(obj).length === 0;
// }
// export function isFunction(obj) {
//   return typeof obj === "function";
// }
// export function isUndefined(obj) {
//   return obj === undefined;
// }
// export function keys(obj) {
//   return Object.keys(obj);
// }
// // export function last(array) {
// //   const length = array == null ? 0 : array.length;
// //   return length ? array[length - 1] : undefined;
// // }
// export function map(obj, action) {
//   if (Array.isArray(obj)) {
//     return obj.map(action);
//   } else {
//     return Object.entries(obj).map(([key, value]) => action(value, key));
//   }
// }
// export function mapValues(obj, action) {
//   return (Array.isArray(obj) ? obj : Object.values(obj)).map(action);
// }
// export function max(list) {
//   let max = undefined;
//   for (let i = 0; i < list.length; i++) {
//     if (i === 0 || list[i] < max) {
//       max = list[i];
//     }
//   }
//   return max;
// }
// export function merge(...list) {
//   return list.reduce((result, obj) => {
//     for (const [key, value] of Object.entries(obj)) {
//       result[key] = value;
//     }
//     return result;
//   }, {});
// }
// export function min(list) {
//   return minBy(list, (d) => d);
// }
// export function minBy(list, get) {
//   let val, min;
//   for (let i = 0; i < list.length; i++) {
//     const value = get(list[i], i, list);
//     if (i === 0 || value > val) {
//       min = list[i];
//       val = value;
//     }
//   }
//   return min;
// }
// // export function now() {
// //   return Date.now();
// // }
// export function pick(obj, keys) {
//   return keys.reduce((result, key) => ((result[key] = obj[key]), result), {});
// }
// export function range(start, stop, step) {
//   if (stop === undefined) {
//     stop = start;
//     start = 0;
//     step = start > 0 ? 1 : -1;
//   } else if (step === undefined) {
//     step = stop > start ? 1 : -1;
//   }
//   const delta = Math.abs(stop - start);
//   let result = [];
//   for (let i = 0, val = start; i < delta; i++, val += step) {
//     result.push(val);
//   }
//   return result;
// }
// export function reduce(list, action) {
//   if (Array.isArray(list)) return list.reduce(action, {});
//   else
//     Object.entries(list).reduce(
//       (result, [key, value]) => action(result, value, key),
//       {}
//     );
// }

// export function sortBy(list, get) {
//   return list.sort((a, b) => {
//     const keyA = get(a);
//     const keyB = get(b);
//     return keyA > keyB ? 1 : keyA === keyB ? 0 : -1;
//   });
// }
// // export function size(list) {
// //   return (Array.isArray(list) ? list : Object.keys(list)).length;
// // }

// // export const transform = reduce;

// export function values(obj) {
//   return Array.isArray(obj) ? [...obj] : Object.values(obj);
// }

// let idCounter = 0;
// export function uniqueId(prefix) {
//   var id = ++idCounter;
//   return toString(prefix) + id;
// }

// export function union(...values) {
//   const set = new Set();
//   for (const val of values) {
//     for (const item of toArray(val)) {
//       set.add(item);
//     }
//   }
//   return [...set];
// }
// function toArray(val) {
//   return Array.isArray(val) ? val : val !== undefined ? [val] : [];
// }
// // export { default as zipObject } from "lodash/zipObject.js";

// // export { default as constant } from "lodash/constant.js";
// // export { default as clone } from "lodash/clone.js";
// // export { default as cloneDeep } from "lodash/cloneDeep.js";
// // export { default as defaults } from "lodash/defaults.js";
// // export { default as each } from "lodash/forEach.js";
// // export { default as forEach } from "lodash/forEach.js";
// // export { default as find } from "lodash/find.js";
// // export { default as filter } from "lodash/filter.js";
// // export { default as flatten } from "lodash/flatten.js";
// // export { default as forIn } from "lodash/forIn.js";
// // export { default as forOwn } from "lodash/forOwn.js";
// // export { default as has } from "lodash/has.js";
// // export { default as isArray } from "lodash/isArray.js";
// // export { default as isEmpty } from "lodash/isEmpty.js";
// // export { default as isFunction } from "lodash/isFunction.js";
// // export { default as isUndefined } from "lodash/isUndefined.js";
// // export { default as keys } from "lodash/keys.js";
// // export { default as last } from "lodash/last.js";
// // export { default as map } from "lodash/map.js";
// // export { default as mapValues } from "lodash/mapValues.js";
// // export { default as max } from "lodash/max.js";
// // export { default as merge } from "lodash/merge.js";
// // export { default as min } from "lodash/min.js";
// // export { default as minBy } from "lodash/minBy.js";
// // export { default as now } from "lodash/now.js";
// // export { default as pick } from "lodash/pick.js";
// // export { default as range } from "lodash/range.js";
// // export { default as reduce } from "lodash/reduce.js";
// // export { default as sortBy } from "lodash/sortBy.js";
// // export { default as size } from "lodash/size.js";
// // export { default as transform } from "lodash/transform.js";
// // export { default as values } from "lodash/values.js";
// // export { default as uniqueId } from "lodash/uniqueId.js";
// // export { default as union } from "lodash/union.js";
// // export { default as zipObject } from "lodash/zipObject.js";

// // ---------------------------------------
// // export { default as constant } from "lodash.constant";
// // export { default as clone } from "lodash.clone";
// // export { default as cloneDeep } from "lodash.clonedeep";
// // export { default as defaults } from "lodash.defaults";
// // export { default as each } from "lodash.foreach";
// // export { default as forEach } from "lodash.foreach";
// // export { default as find } from "lodash.find";
// // export { default as filter } from "lodash.filter";
// // export { default as flatten } from "lodash.flatten";
// // export { default as forIn } from "lodash.forin";
// // export { default as forOwn } from "lodash.forown";
// // export { default as has } from "lodash.has";
// // export { default as isArray } from "lodash.isarray";
// // export { default as isEmpty } from "lodash.isempty";
// // export { default as isFunction } from "lodash.isfunction";
// // export { default as isUndefined } from "lodash.isundefined";
// // export { default as keys } from "lodash.keys";
// // export { default as last } from "lodash.last";
// // export { default as map } from "lodash.map";
// // export { default as mapValues } from "lodash.mapvalues";
// // export { default as max } from "lodash.max";
// // export { default as merge } from "lodash.merge";
// // export { default as min } from "lodash.min";
// // export { default as minBy } from "lodash.minby";
// // export { default as now } from "lodash.now";
// // export { default as pick } from "lodash.pick";
// // export { default as range } from "lodash.range";
// // export { default as reduce } from "lodash.reduce";
// // export { default as sortBy } from "lodash.sortby";
// // export { default as size } from "lodash.size";
// // export { default as transform } from "lodash.transform";
// // export { default as values } from "lodash.values";
// // export { default as uniqueId } from "lodash.uniqueid";
// // export { default as union } from "lodash.union";
// // export { default as zipObject } from "lodash.zipobject";

// // export {
// // constant,
// // clone,
// // cloneDeep,
// // defaults,
// // each,
// // find,
// // filter,
// // flatten,
// // forEach,
// // forIn,
// // forOwn,
// // has,
// // isArray,
// // isEmpty,
// // isFunction,
// // isUndefined,
// // keys,
// // last,
// // map,
// // mapValues,
// // max,
// // merge,
// // min,
// // minBy,
// // now,
// // pick,
// // range,
// // reduce,
// // sortBy,
// // size,
// // transform,
// // values,
// // uniqueId,
// // union,
// // zipObject,
// // } from "lodash-es";
