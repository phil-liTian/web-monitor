/*
 * @author: phil.li
 */
import axios from 'axios';
import { SourceMapConsumer } from 'source-map-js';
import { message } from 'ant-design-vue';
function matchStr(str) {
  if (!str) return;
  if (str.endsWith('.js')) return str.substring(str.lastIndexOf('/') + 1);
}

// 将所有的空格转化为实体字符
function repalceAll(str) {
  return str.replace(new RegExp(' ', 'gm'), '&nbsp;');
}

async function loadSourceMap(fileName) {
  const file = matchStr(fileName);
  if (!file) return;

  const res = await axios.get(`http://localhost:3005/getJsMap?fileName=${file}`);
  return JSON.parse(res.data.data);
}

export async function findSourceBySourceMap({ fileName, line, col }, callback) {
  const sourceData = await loadSourceMap(fileName);

  const { sourcesContent, sources } = sourceData;
  const consumer = await new SourceMapConsumer(sourceData);

  let result = consumer.originalPositionFor({
    line: Number(line),
    column: Number(col),
  });

  /**
   * result的结果
   * {
   *   line: 1,
   *   column: 0,
   *   source: '../../src/components/HelloWorld.vue', 报错的文件
   * }
   */

  if (result.source && result.source.includes('node_modules')) {
    // 三方文件解析不了, 因为没有sourcemap

    return message.error('三方文件解析不了，因为没有sourceMap');
  }

  let index = sources.indexOf(result.source);
  if (index === -1) {
    return message.error('源码解析失败');
  }

  let code = sourcesContent[index];
  const codeList = code.split('\n');
  let row = result.line,
    len = codeList.length - 1;

  const start = Math.max(0, row - 5),
    end = Math.min(len, row + 9);
  let newLines: string[] = [];
  let j = 0;
  for (let i = start; i <= end; i++) {
    j++;
    newLines.push(`<div class='code-line ${i + 1 == row ? 'heightlight' : ''}'>
      ${j}. ${repalceAll(codeList[i])}
      </div>`);
  }

  let innerHtml = `<div class='errdetail'>
    <div class='errheader'> ${result.source} as line ${result.column}:${result.line} </div>
  ${newLines.join('')}
  </div>`;
  callback(innerHtml);
}
