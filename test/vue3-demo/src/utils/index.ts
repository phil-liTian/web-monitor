/*
 * @author: phil.li
 */
export const format = (time: string) => {
  let str = new Date(time);
  return str.toLocaleDateString().replace(/\//g, '-') + ' ' + str.toTimeString().substr(0, 8);
};
