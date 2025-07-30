<template>
    <div class="image-clip p-3">
        <div
            v-if="showMenu"
            class="content d-flex flex-wrap gap-3 row-gap-2">
            <div
                v-for="menu in menus"
                :key="menu.name"
                class="menu p-2 shadow-sm"
                @click="handleClick(menu.name)"
            >
                <div class="menu-header title">
                    {{ menu.label }}
                </div>
                <div class="menu-body">
                    ...
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../../hooks/stores'

const store = useStore()

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

let ipcListener = null

const curPath = ref('')

const route = useRoute()
const router = useRouter()

const showMenu = computed(() => route.name === 'ImageClip')

function handleClick(name) {
    store.reset()
    curPath.value = name
    router.push({ name })
}

onMounted(() => {
    ipcListener = window.electronAPI.imageProcessResult((res) => {
        console.log('imageProcessResultt', res)
        // 计算处理结束的图片数量
        store.convertCount++
        // 接收处理失败的文件
        if (res.errFile) {
            store.errFiles.push(res.errFile)
        }
        if (store.convertCount === store.files.length) {
            if (store.convertCount === 1 && store.errFiles.length === 1) {
                ElMessage.success('图片处理失败')
            }
            else {
                ElMessage.success('图片处理结束')
            }
        }
    })
})

onBeforeUnmount(() => {
    if (ipcListener) {
        ipcListener()
    }
})
</script>

<style lang="scss" scoped>
.image-clip{
    user-select: none;
    .content{
        .menu{
            min-width: 160px;
            width: 160px;
            border-radius: 8px;
            border: 1px solid transparent;
            cursor: pointer;
            &:hover{
                border-color: pink;
            }
        }
    }
}
</style>
