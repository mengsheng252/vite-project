<template>
    <div v-loading="loading" class="image-clip p-3">
        <div class="container">
            <el-button type="primary" class="upload-btn" @click="uploadImage">
                <div>上传图片</div>
                <el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(false)

const fileInfo = ref([])

/**
 * 主进程打开选择文件窗口
 */
async function uploadImage() {
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog()
}

onMounted(() => {
    // 监听主进程窗口选择的文件列表
    window.electronAPI.onFileSelected((info) => {
        const data = info.paths.map((path, index) => {
            return {
                path,
                name: info.names[index]
            }
        })
        fileInfo.value.push(...data)
    })
})
</script>

<style lang="scss" scoped>
.image-clip{

}
</style>
