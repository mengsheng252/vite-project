<template>
    <div v-loading="loading" class="image-clip p-3">
        <div class="container">
            <el-button type="primary" class="upload-btn" @click="uploadImage">
                <div>上传图片</div>
                <el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button>
            <img-clip v-if="src" :src="src"></img-clip>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import imgClip from '@/components/imgClip.vue'

const loading = ref(false)

const src = ref('')

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
        // const data = info.paths.map((path, index) => {
        //     return {
        //         path,
        //         name: info.names[index]
        //     }
        // })
        // fileInfo.value.push(...data)
        src.value = info.paths[0]
        console.log('info---', info)
    })
})
</script>

<style lang="scss" scoped>
.image-clip{

}
</style>
