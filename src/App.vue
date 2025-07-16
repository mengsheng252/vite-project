<template>
    <el-config-provider>
        <AppHeader></AppHeader>
        <Storage></Storage>
        <routerView></routerView>
    </el-config-provider>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import Storage from '@/components/Storage.vue'
</script>

<style scoped>
/* #appHeader{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
} */
</style>
