<!--
 * @author: phil.li
-->
<template>
  <Modal v-model:open="openRef" title="查看源码" width="70%">1231</Modal>
</template>

<script lang="ts" setup>
import { watch, ref, watchEffect } from 'vue';
import { Modal } from 'ant-design-vue';
import { findSourceBySourceMap } from '../utils/sourceMap';
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

const getRevertCode = () => {
  const { fileName, column, line } = props.record;
  findSourceBySourceMap({ fileName, column, line }, res => {
    console.log('res', res);
  });
};

watchEffect(() => {
  openRef.value = props.visible;
});

watch(
  () => openRef.value,
  val => {
    if (val) {
      getRevertCode();
    }

    emits('update:visible', val);
  },
);
</script>

<style lang="less" scoped></style>
