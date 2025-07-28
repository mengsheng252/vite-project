<template>
    <div
        v-loading="loading"
        class="image-crop p-3">
        <div class="container">
            <!-- <el-button type="primary" class="upload-btn" @click="uploadImage">
                <div>上传图片</div>
                <el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button> -->
            <FileUpload></FileUpload>
            <img-crop
                v-if="src"
                :src="src"></img-crop>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import imgCrop from '@/components/imgCrop.vue'
import { useStore } from '@/hooks/stores'

const loading = ref(false)

// const src = ref('')

const src = computed(() => {
    const files = useStore().files
    if (files) {
        return files.paths[0]
    }
    return ''
})

/**
 * 主进程打开选择文件窗口
 */
// async function uploadImage() {
//     // 通知主进程打开文件对话框
//     window.electronAPI.openFileDialog()
// }

// onMounted(() => {
//     // 监听主进程窗口选择的文件列表
//     window.electronAPI.onFileSelected((info) => {
//         src.value = info.paths[0]
//         console.log('info---', info)
//     })
// })
</script>

<style lang="scss" scoped>
.image-clip{
    user-select: none;
}
</style>
