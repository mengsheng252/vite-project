<template>
    <div class="file-upload mt-3 mb-3">
        <el-button
            type="primary"
            class="upload-btn"
            @click="uploadImage">
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

/**
 * 主进程打开选择文件窗口
 */
async function uploadImage() {
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog()
}

onMounted(() => {
    // 监听主进程窗口选择的文件列表
    // window.electronAPI.onFileSelected((info) => {
    //     useStore().setFiles(info)
    // })
    useStore().setupFileListener()
})
</script>
