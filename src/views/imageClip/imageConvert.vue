<template>
    <div
        v-loading="loading"
        class="image-convert p-3">
        <Storage></Storage>
        <div class="container d-flex flex-column">
            <!-- <el-button type="primary" class="upload-btn" @click="uploadImage">
                <div>上传图片</div>
                <el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button> -->
            <FileUpload :multiple="true"></FileUpload>
            <div class="transform d-flex flex-column">
                <div class="show-files">
                    <div>文件列表：</div>
                    <div class="file-list d-flex">
                        <div
                            v-for="info, index in fileInfo"
                            :key="info.name"
                            class="file position-relative">
                            <el-icon
                                class="close-btn position-absolute"
                                color="#409EFF"
                                @click="removeFile(index)">
                                <CircleCloseFilled />
                            </el-icon>
                            <img
                                class="cover"
                                :src="info.path"
                                alt="">
                            <div
                                class="file-name text-ellipsis"
                                :title="info.name">
                                {{ info.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="transform-type d-flex align-items-center">
                    <div>转换类型：</div>
                    <el-select
                        v-model="convertType"
                        placeholder="Select">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <el-button
                    type="primary"
                    class="start-convert"
                    :disabled="!fileInfo.length"
                    @click="start">
                    开始转换
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import Storage from '@/components/Storage.vue'
import { useStore } from '@/hooks/stores'
import { convertImage } from '@/hooks/useCommon'

const store = useStore()

const loading = ref(false)

const convertType = ref('png')

const options = [
    {
        value: 'png',
        label: 'png'
    },
    {
        value: 'jpg',
        label: 'jpg'
    },
    {
        value: 'jpeg',
        label: 'jpeg'
    },
    {
        value: 'webp',
        label: 'webp'
    }
]

const fileInfo = computed(() => store.files || [])

async function start() {
    loading.value = true
    for await (const info of fileInfo.value) {
        await convertImage(info.path, convertType.value)
    }
    // window.$message.success('转换结束')
    loading.value = false
    ElMessage({
        message: '转换结束',
        type: 'success'
    })
}

/**
 * 移除文件
 * @param index
 */
function removeFile(index) {
    fileInfo.value.splice(index, 1)
}

// onMounted(async () => {
//     // 监听主进程窗口选择的文件列表
//     window.electronAPI.onFileSelected(async (info) => {
//         const data = info.paths.map((path, index) => {
//             return {
//                 path,
//                 name: info.names[index]
//             }
//         })
//         fileInfo.value.push(...data)
//     })
// })
</script>

<style lang="scss" scoped>
.image-convert {
  .container {
    width: 1200px;
    .path-label{
        min-width: 80px;
    }
    .select-storage-path{
        max-width: 420px;
        height: 40px;
    }
    .transform {
        row-gap: 24px;
      .show-files {
        width: 800px;
        .file-list {
          column-gap: 12px;
          .file {
            .close-btn{
                font-size: 24px;
                top: -6px;
                right: -6px;
                cursor: pointer;
            }
            .cover {
              width: 120px;
              height: 120px;
              object-fit: contain;
            }
            .file-name {
              width: 120px;
              font-size: 10px;
            }
          }
        }
      }
      .start-convert {
        width: 100px;
      }
      .transform {
        width: 200px;
      }
    }
  }
}
</style>
