<!--
 * @author: phil.li
-->
<template>
  <Modal
    :bodyStyle="{ maxHeight: '600px', overflowY: 'auto', paddingTop: '20px' }"
    v-model:open="openRef"
    title="查看用户行为"
    width="70%"
  >
    <Timeline>
      <TimelineItem :color="item.color" v-for="item in timeLineData"
        >{{ item.content }}
        <div>{{ item.time }}</div>
      </TimelineItem>
    </Timeline>
  </Modal>
</template>

<script lang="ts" setup>
import { watch, ref, watchEffect } from 'vue';
import { Modal, Timeline } from 'ant-design-vue';
import { format } from '../utils';
const TimelineItem = Timeline.Item;
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  record: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const openRef = ref();
const timeLineData = ref<{ content: string; color: string; time: string }[]>([]);
const emits = defineEmits(['update:visible']);

const getBreadcrumbData = () => {
  console.log('props', props.record.breadcrumb);
  timeLineData.value = (props.record.breadcrumb || []).map(item => {
    item.color = item.status === 'ok' ? 'green' : 'red';
    if (item.category === 'Http') {
      item.content = `接口调用: ${item.data.url}, ${item.status === 'ok' ? '请求成功' : '请求失败'}`;
    } else if (item.category === 'Code_Error') {
      item.content = `代码错误: ${item.data.message}`;
    } else if (item.category === 'Route') {
      item.content = `路由跳转: 从${item.data.from}页面，跳转到 ${item.data.to} 页面`;
    } else if (item.category === 'Click') {
      item.content = `用户点击dom事件: ${item.data}`;
    } else if (item.category === 'Resource_Error') {
      item.content = `资源加载错误: ${item.data.message}`;
    }

    return {
      ...item,
      time: format(item.data?.time),
    };
  });
};

watchEffect(() => {
  openRef.value = props.visible;
});

watch(
  () => openRef.value,
  val => {
    if (val) {
      getBreadcrumbData();
    }

    emits('update:visible', val);
  },
);
</script>

<style lang="less" scoped></style>
