<template>
    <div class="app-header d-flex p-2 px-4 shadow-sm">
        <div
            v-for="menu in menus"
            :key="menu.name"
            class="menu title text-center"
            @click="handleClick(menu.name)">
            {{ menu.label }}
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const menus = [
    {
        label: '图片剪辑',
        name: 'ImageClip',
    },
    {
        label: '视频剪辑',
        name: 'VideoClip',
    },
    {
        label: '文本剪辑',
        name: 'TextClip',
    }
]
const router = useRouter()
function handleClick(name) {
    router.push({ name })
}
</script>

<style lang="scss" scoped>
.app-header{
    column-gap: 16px;
    .menu{
        min-width: 80px;
        cursor: pointer;
        &:hover{
            background-color: pink;
        }
    }
}
</style>
