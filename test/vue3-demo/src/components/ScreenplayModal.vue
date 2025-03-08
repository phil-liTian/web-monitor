<!--
 * @author: phil.li
-->
<template>
  <Modal wrap-class-name="full-modal" width="1100px" title="播放录屏" v-model:visible="openRef">
    <div v-if="openRef" id="revert"></div>
  </Modal>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, watch, watchEffect, nextTick } from 'vue';
import { Modal } from 'ant-design-vue';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { unzip } from '../utils/recordScreen';

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
const emits = defineEmits(['update:visible']);

const getScreenPlay = async () => {
  const { recordScreenId } = props.record;
  const res = await axios.get(`http://localhost:3005/getRecordScreenId?id=${recordScreenId}`);
  console.log('props.record', res);
  if (res.data.data?.events) {
    let { events } = res.data.data;
    let _events = unzip(events);
    nextTick(() => {
      new rrwebPlayer(
        {
          target: document.getElementById('revert')!,
          data: {
            events: _events,
          },
        },
        // @ts-ignore
        {
          UNSAFE_replayCanvas: true,
        },
      );
    });
  }
  // const { events } = res.data.data;
  // console.log('events', events);
};

watchEffect(() => {
  openRef.value = props.visible;
});

watch(
  () => openRef.value,
  val => {
    if (val) {
      getScreenPlay();
    }

    emits('update:visible', val);
  },
);
</script>

<style lang="less" scoped>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}

#revert {
  width: 100%;
  display: flex;
}
</style>
