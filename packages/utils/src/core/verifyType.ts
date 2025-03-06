/*
 * @author: phil.li
 */

function isType(type: any) {
  return function (obj: any) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
}

export const veriableTypeDetection = {
  isString: isType('String'),
};
