<template>
    <div class="file-upload w-100">
        <Storage></Storage>
        <el-button
            type="primary"
            class="upload-btn"
            @click="uploadImage"
        >
            <div>上传图片</div>
            <el-icon class="el-icon--right">
                <Upload />
            </el-icon>
        </el-button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/hooks/stores'
import Storage from './Storage.vue'

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    }
})

// 选择文件参数配置
const openImageOptions = {
    title: '选择文件',
    properties: ['openFile', 'multiSelections'],
    filters: [
        { name: 'Images', extensions: ['jpg', 'png'] }
        // { name: 'All Files', extensions: ['*'] }
    ]
}

/**
 * 主进程打开选择文件窗口
 */
async function uploadImage() {
    const options = openImageOptions
    if (!props.multiple) {
        options.properties = ['openFile']
    }
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog(options)
}

onMounted(() => {
    // 监听主进程窗口选择的文件列表
    // window.electronAPI.onFileSelected((info) => {
    //     useStore().setFiles(info)
    // })
    useStore().setupFileListener()
})
</script>
