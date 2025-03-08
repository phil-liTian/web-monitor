<!--
 * @author: phil.li
-->
<script setup lang="tsx">
import { ref, h, onMounted } from 'vue';
import axios from 'axios';
import { Table, Button, Row, Col } from 'ant-design-vue';
import SourceCodeModal from './SourceCodeModal.vue';
import BreadcrumbModal from './BreadcrumbModal.vue';
import ScreenplayModal from './ScreenplayModal.vue';
import { format } from '../utils/index';
const showSourceCode = ref(false);
const recordInfo = ref({});
const showScreenPlay = ref(false);
const showBreadcrumb = ref(false);

const handleClick = (type, record: any) => {
  recordInfo.value = record;
  switch (type) {
    case 'sourceCode':
      showSourceCode.value = true;
      break;
    case 'detail':
      showBreadcrumb.value = true;
      break;
    case 'playScreen':
      showScreenPlay.value = true;
      break;
    default:
      break;
  }
};

const buttons = [
  { label: '查看源码', key: 'sourceCode' },
  { label: '播放录屏', key: 'playScreen' },
  { label: '查看用户行为', key: 'detail' },
];
const dataList = ref([]);
const columns = [
  { title: '序号', dataIndex: 'index', width: 50, key: 'index' },
  { title: '报错信息', dataIndex: 'message', key: 'message' },
  { title: '报错页面', dataIndex: 'pageUrl', key: 'pageUrl' },
  { title: '报错时间', dataIndex: 'time', key: 'time' },
  { title: '项目编号', dataIndex: 'apikey', key: 'apikey' },
  { title: '用户id', dataIndex: 'userId', key: 'userId' },
  { title: 'SDK版本', dataIndex: 'sdkVersion', key: 'sdkVersion' },
  { title: '浏览器信息', dataIndex: 'browserStr', key: 'browser', width: 240 },
  { title: '操作系统', dataIndex: 'osStr', key: 'osStr', width: 240 },
  {
    title: '还原错误代码',
    // fixed: 'right',
    width: 400,
    key: 'action',
    dataIndex: 'action',
    customRender: ({ record }) => {
      return h(
        'div',
        {},
        buttons.map(item => {
          return h(
            Button,
            {
              type: 'primary',
              style: { marginRight: '10px' },
              onClick: () => handleClick(item.key, record),
            },
            () => item.label,
          );
        }),
      );
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
  axios.get('http://localhost:3005/getErrorList').then(res => {
    const { data } = res.data;
    dataList.value = data.map((item: any, index: number) => {
      item.time = format(item.time);
      item.osStr = `${item.deviceInfo?.osName || ''} ${item.deviceInfo?.osVersion || ''}`;
      item.browserStr = `${item.deviceInfo?.browserName || ''} ${item.deviceInfo?.browserVersion || ''}`;
      item.index = index + 1;
      return item;
    });
  });
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
      <!-- <Col><Button type="primary" @click="forward">前进</Button></Col> -->
    </Row>

    <Table :columns="columns" :dataSource="dataList" />
    <SourceCodeModal v-model:visible="showSourceCode" :record="recordInfo" />
    <BreadcrumbModal v-model:visible="showBreadcrumb" :record="recordInfo" />
    <ScreenplayModal v-model:visible="showScreenPlay" :record="recordInfo" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
