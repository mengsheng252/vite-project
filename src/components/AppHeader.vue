<template>
    <div class="app-header">
        <div
            v-for="menu in menus"
            :key="menu.name"
            class="menu"
            @click="handleClick(menu.name)">
            {{ menu.label }}
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const menus = [
    {
        label: '格式转换',
        name: 'ImageConvert',

    },
    {
        label: '裁剪',
        name: 'ImageCrop',
    },
    {
        label: '调整大小',
        name: 'ImageSize'
    },
    {
        label: '旋转/翻转',
        name: 'ImageFlip'
    },
    {
        label: '质量压缩',
        name: 'ImageCompress'
    },
    {
        label: '锐化/模糊',
        name: 'ImageSharpening'
    },
    {
        label: '色彩调整',
        name: 'ImageConvert'
    },
    {
        label: '去除噪点',
        name: 'ImageConvert'
    },
    {
        label: '添加水印',
        name: 'ImageConvert'
    },
    {
        label: '边缘检测',
        name: 'ImageConvert'
    },
    {
        label: '油画效果',
        name: 'ImageConvert'
    },
    {
        label: '生成缩略图',
        name: 'ImageConvert'
    },
    {
        label: '图片拼接',
        name: 'ImageConvert'
    },
    {
        label: '添加边框',
        name: 'ImageConvert'
    },
    {
        label: '混合图片',
        name: 'ImageConvert'
    },
    {
        label: '识别图像信息',
        name: 'ImageConvert'
    }
]
const router = useRouter()
function handleClick(name) {
    router.push({ name })
}
</script>
