<template>
    <div id="appHeader" class="app-header">
        <div class="menu d-flex">
            <div
                v-for="item in menu"
                :key="item.name"
                class="menu-item"
                @click="toView(item.pathName)"
            >
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

const router = useRouter()
const menu = [
    {
        name: '图片格式转换',
        pathName: 'ImageConvert'
    },
    {
        name: '图片剪辑',
        pathName: 'ImageClip'
    }
]

function toView(path) {
    router.push({ path })
}
</script>

<style lang="scss" scoped>
.app-header{
    background-color: #fadee4;
    .menu{
        column-gap: 20px;
        padding: 4px 20px;
    }
}
</style>
