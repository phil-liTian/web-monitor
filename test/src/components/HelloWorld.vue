<!--
 * @author: phil.li
-->
<script setup lang="ts">
import { Table, Button, Row } from 'ant-design-vue'

const codeError = () => {
  let a = undefined as any
  if ( a.length ) {
    console.log(a)
  }
}

</script>

<template>
  <div>     
    <Row>
      <Button type="primary" @click="codeError">JS 错误</Button>
    </Row>
    

    <Table />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
