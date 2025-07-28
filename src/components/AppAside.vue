<template>
    <div
        id="appAside"
        class="app-aside">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
        >
            <el-sub-menu
                v-for="subMenu in menus"
                :key="subMenu.id"
                :index="subMenu.id">
                <template #title>
                    {{ subMenu.label }}
                </template>
                <el-menu-item
                    v-for="menu in subMenu.child"
                    :key="menu.id"
                    :index="menu.id">
                    {{ menu.label }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../hooks/stores'

const router = useRouter()

const activeId = ref('1')

const menus = [
    {
        label: '图片剪辑',
        id: '1',
        child: [
            {
                label: '格式转换',
                name: 'ImageConvert',
                id: '1-1'
            },
            {
                label: '裁剪',
                name: 'ImageCrop',
                id: '1-2'
            },
            {
                label: '调整大小',
                name: 'ImageSize',
                id: '1-3'
            },
            {
                label: '旋转/翻转',
                name: 'ImageFlip',
                id: '1-4'
            },
            {
                label: '质量压缩',
                name: 'ImageCompress',
                id: '1-5'
            },
            {
                label: '锐化/模糊',
                name: 'ImageSharpening',
                id: '1-6'
            },
            {
                label: '色彩调整',
                name: 'ImageConvert',
                id: '1-7'
            },
            {
                label: '去除噪点',
                name: 'ImageConvert',
                id: '1-8'
            },
            {
                label: '添加水印',
                name: 'ImageConvert',
                id: '1-9'
            },
            {
                label: '边缘检测',
                name: 'ImageConvert',
                id: '1-10'
            },
            {
                label: '油画效果',
                name: 'ImageConvert',
                id: '1-11'
            },
            {
                label: '生成缩略图',
                name: 'ImageConvert',
                id: '1-12'
            },
            {
                label: '图片拼接',
                name: 'ImageConvert',
                id: '1-13'
            },
            {
                label: '添加边框',
                name: 'ImageConvert',
                id: '1-14'
            },
            {
                label: '混合图片',
                name: 'ImageConvert',
                id: '1-15'
            },
            {
                label: '识别图像信息',
                name: 'ImageConvert',
                id: '1-16'
            }
        ]
    }
]

/**
 * 查找激活菜单路由
 * @param id
 * @param arr
 */
function getActiveName(id, arr) {
    let name = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            name = arr[i].name
        }
        else if (arr[i].child && Array.isArray(arr[i].child)) {
            name = getActiveName(id, arr[i].child)
        }
    }
    return name
}

/**
 * 切换路由，清除全局数据
 * @param id
 */
function handleSelect(id) {
    activeId.value = id
    const name = getActiveName(id, menus)
    // 清空全局files数据，各个功能数据不一致，需要重新上传
    useStore().reset()
    router.push({ name })
}

function handleOpen() {}

function handleClose() {}
</script>

<style lang="scss" scoped>
.app-aside{
}
</style>
