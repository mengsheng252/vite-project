<template>
    <div class="image-convert">
        <el-button type="primary" @click="uploadFile">
            上传
        </el-button>
        <div class="transform d-flex">
            <div class="show-files">
                <div>已上传文件</div>
                <div class="file-list">
                    <div v-for="(path, index) in filePaths" :key="path" class="file">
                        <img class="cover" :src="path" alt="">
                        <div>{{ fileNames[index] }}</div>
                    </div>
                </div>
            </div>
            <div class="btn" @click="start">
                开始转换
            </div>
            <div class="res-list">
                <div>转换成功文件</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { doConvert } from '@/hooks/useCommon'

const files = reactive([])

const filePaths = reactive([])

const fileNames = reactive([])

async function uploadFile() {
    // const data = await pickImage()
    // files.push(...data)
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog()
}

function start() {
    doConvert(files)
}

onMounted(() => {
    // 监听主进程返回的路径
    window.electronAPI.onFileSelected((fileInfo) => {
        filePaths.push(...fileInfo.paths)
        fileNames.push(...fileInfo.names)
    })
})
</script>

<style lang="scss" scoped>
.image-convert {
  .transform {
    column-gap: 48px;
    .show-files{
        .file-list{
            .file{
                .cover{
                    width: 400px;
                    height: auto;
                    object-fit: cover;
                }
            }
        }
    }
  }
}
</style>
