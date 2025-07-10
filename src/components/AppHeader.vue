<template>
  <div id="appHeader" class="app-header">
    <div class="menu d-flex">
      <div v-for="item in menu" :key="item.name" class="menu-item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script setup>
const menu = [
  {
    name: "图片格式转换",
    path: "imageConvert",
  },
  {
    name: "图片剪辑",
    path: "imageClip",
  },
];
</script>
