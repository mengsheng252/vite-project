<template>
    <!-- <el-config-provider>
        <AppHeader></AppHeader>
        <routerView :key="$route.fullPath"></routerView>
    </el-config-provider> -->

    <el-container>
        <el-aside width="180px">
            <AppAside></AppAside>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <routerView :key="$route.fullPath"></routerView>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import AppAside from './components/AppAside.vue'
</script>

<style scoped>
/* #appHeader{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
} */

 .el-aside{
  height: 100vh;
  overflow-y: scroll;
 }
</style>
