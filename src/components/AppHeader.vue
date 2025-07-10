<template>
    <div id="appHeader" class="app-header">
        <div class="menu d-flex">
            <div v-for="item in menu" :key="item.name" class="menu-item" @click="toView(item.path)">
                <!-- {{ item.name }} -->
                <el-button type="primary">
                    {{ item.name }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter
const menu = [
    {
        name: '图片格式转换',
        path: 'imageConvert'
    },
    {
        name: '图片剪辑',
        path: 'imageClip'
    }
]

function toView(path) {
    router.push({ path })
}
</script>

<style lang="scss" scoped>
.app-header{
    .menu{
        column-gap: 20px;
        .menu-item{
            border: 1px solid pink;
            padding: 20px;
        }
    }
}
</style>
