<template>
    <el-config-provider>
        <AppHeader></AppHeader>
        <routerView :key="$route.fullPath"></routerView>
    </el-config-provider>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>
