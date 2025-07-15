<template>
    <div class="image-convert pt-3">
        <div class="container d-flex flex-column">
            <div class="sotrage-path d-flex align-items-center">
                <div class="path-label">
                    默认保存路径：
                </div>
                <div class="select-storage-path btn border border-primary text-ellipsis" :title="storagePath" @click="handlePath">
                    {{ storagePath }}
                </div>
                <el-button type="primary" class="ms-3" @click="openFolder">
                    立即查看
                </el-button>
            </div>
            <el-button type="primary" class="upload-btn" @click="uploadFile">
                <div>上传文件</div>
                <el-icon class="el-icon--right">
                    <Upload />
                </el-icon>
            </el-button>
            <div class="transform d-flex flex-column">
                <div class="show-files">
                    <div>文件列表：</div>
                    <div class="file-list d-flex">
                        <div v-for="info in fileInfo" :key="info.name" class="file">
                            <img class="cover" :src="info.path" alt="">
                            <div class="file-name text-ellipsis" :title="info.name">
                                {{ info.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="transform-type d-flex align-items-center">
                    <div>转换类型：</div>
                    <el-select v-model="convertType" placeholder="Select">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
                <el-button type="primary" class="start-convert" @click="start">
                    开始转换
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { convertImage } from '@/hooks/useCommon'

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
    },
    {
        value: 'bmp',
        label: 'bmp'
    }
]

const storagePath = ref('')

const fileInfo = ref([])

async function uploadFile() {
    // 通知主进程打开文件对话框
    window.electronAPI.openFileDialog()
}

function openFolder() {
    window.electronAPI.openFolder()
}

async function start() {
    console.log('待转换文件', fileInfo.value)
    for await (const info of fileInfo.value) {
        await convertImage(info.path, convertType.value)
    }
    // window.$message.success('转换结束')
    ElMessage({
        message: '转换结束',
        type: 'success'
    })
}

async function handlePath() {
    storagePath.value = await window.electronAPI.handlePath()
}

onMounted(async () => {
    // 监听主进程返回的路径
    window.electronAPI.onFileSelected(async (info) => {
        const data = info.paths.map((path, index) => {
            return {
                path,
                name: info.names[index]
            }
        })
        fileInfo.value.push(...data)
    })
    // 获取桌面路径作为默认存储地址
    storagePath.value = await window.electronAPI.getDesktopPath()
    console.log('桌面路径：', storagePath.value)
})
</script>

<style lang="scss" scoped>
.image-convert {
  .container {
    width: 1200px;
    .upload-btn {
      margin: 24px 0 24px;
    }
    .path-label{
        width: 120px;
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
