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
  isNumber: isType('Number'),
  isUndefined: isType('Undefined'),
};

  
// 用于判断是否是错误类型
export function isError(error: Error): boolean  {
  return ['[object Error]', '[object Exception]', '[object DOMException]'].includes(
    Object.prototype.toString.call(error),
  );
}
