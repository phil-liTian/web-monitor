<!--
 * @author: phil.li
-->
<script setup lang="tsx">
import { ref, h, onMounted } from 'vue';
import axios from 'axios';
import { Table, Button, Row, Col } from 'ant-design-vue';

const format = time => {
  let str = new Date(time);
  return str.toLocaleDateString().replace(/\//g, '-') + ' ' + str.toTimeString().substr(0, 8);
};

const dataList = ref([]);
const columns = [
  { title: 'index', dataIndex: 'index', width: '50', key: 'index' },
  { title: '报错信息', dataIndex: 'message', key: 'message' },
  { title: '报错页面', dataIndex: 'pageUrl', key: 'pageUrl' },
  { title: '报错时间', dataIndex: 'time', key: 'time' },
  { title: '项目编号', dataIndex: 'apikey', key: 'apikey' },
  { title: '用户id', dataIndex: 'userId', key: 'userId' },
  { title: 'SDK版本', dataIndex: 'sdkVersion', key: 'sdkVersion' },
  { title: '浏览器信息', dataIndex: 'deviceInfo', key: 'deviceInfo', width: 240 },
  {
    title: '还原错误代码',
    fixed: 'right',
    width: 240,
    customRender: ({ text, record, index }) => {
      return h('div', {}, [
        h(Button, { type: 'primary', style: { marginRight: '10px' } }, '查看源码'),
        h(Button, { type: 'primary' }, '播放录屏'),
      ]);
    },
  },
];

const codeError = () => {
  let a = undefined as any;
  getDataList();

  if (a.length) {
    console.log(a);
  }
};

const jsError = () => {
  getDataList();
  setTimeout(() => {
    JSON.parse('');
  }, 1000);
};

const asyncError = () => {
  getDataList();
  new Promise(resolve => {
    const person = {};
    // @ts-ignore
    person.name.age();
    resolve(person);
  });
};

// TODO
const resourceError = () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://abc.com/index.js';
  document.body.appendChild(script);
};

const xhrError = () => {
  // axios.get('https://abc.com/test/api')
  let ajax = new XMLHttpRequest();
  ajax.open('GET', 'https://abc.com/test/api');
  ajax.setRequestHeader('content-type', 'application/json');
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      getDataList();
    }
    if (ajax.status === 200 || ajax.status === 304) {
      console.log('ajax', ajax);
    }
  };
  ajax.send();
};

const getDataList = () => {
  axios.get('http://localhost:3002/getErrorList').then(res => {
    const { data } = res.data;
    dataList.value = data.map(item => {
      item.time = format(item.time);
      return item;
    });
    console.log('res', res);
  });

  // fetch('http:localhost:3002/getErrorList')
  //   .then(response => response.json())
  //   .then(res => {
  //     console.log('res', res);
  //   });
};

onMounted(() => {
  getDataList();
});
</script>

<template>
  <div :style="{ width: '100%', height: '100%' }">
    <Row :style="{ marginBottom: '10px' }" :gutter="[20, 20]">
      <Col>
        <Button @click="getDataList">reload</Button>
      </Col>
      <Col><Button type="primary" @click="codeError">代码错误</Button></Col>
      <Col><Button type="primary" @click="jsError">js错误</Button></Col>
      <Col><Button type="primary" @click="asyncError">异步错误</Button></Col>
      <Col><Button type="primary" @click="resourceError">资源加载错误</Button></Col>
      <Col><Button type="primary" @click="xhrError">xhrError</Button></Col>
    </Row>

    <Table :columns="columns" :dataSource="dataList" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
