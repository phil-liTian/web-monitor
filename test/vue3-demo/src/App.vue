<!--
 * @author: phil.li
-->
<!--
 * @author: phil.li
-->
<script setup lang="ts"></script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &:first-child {
      margin-right: 20px;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
