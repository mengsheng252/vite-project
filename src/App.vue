<template>
    <el-config-provider namespace="ep">
        <AppHeader></AppHeader>
        <routerView></routerView>
        <AppFooter></AppFooter>
    </el-config-provider>
</template>

<script setup>
// import AppFooter from '@/components/AppFooter.vue'
// import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
#appHeader{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>
