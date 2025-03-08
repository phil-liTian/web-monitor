/*
 * @author: phil.li
 */
import axios from 'axios';

async function loadSourceMap(fileName) {
  const res = await axios.get(`http://localhost:3005/getJsMap?fileName=${fileName}`);
  console.log('res', res);
}

export function findSourceBySourceMap({ fileName, line, column }, callback) {
  loadSourceMap(fileName);
  callback();
}
