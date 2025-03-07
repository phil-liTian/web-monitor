/*
 * @author: phil.li
 */
/*
 * @author: phil.li
 */
export function htmlElementAsString(element: HTMLElement): string {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'body') return '';
  let classNames = element.classList.value;
  classNames = classNames ? ` class="${classNames}"` : '';
  const id = element.id ? ` id="${element.id}"` : '';
  const innerText = element.innerText;

  return `<${tagName}${id}${classNames}>${innerText}</${tagName}>`;
}

/**
 * input: https://www.doubao.com/chat?token=123&name=phil
 * {
 *  host: 'www.doubao.com',
 *  path: '/chat',
 *  protocol: 'https',
 *  relative: '/chat?token=123&name=phil'
 * }
 *
 * @param url
 * @returns
 */
export function parseUrlToObj(url: string) {
  if (!url) return {};

  const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment,
  };
}
