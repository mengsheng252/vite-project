<template>
    <div
        v-loading="loading"
        class="image-convert p-3"
    >
        <div class="container d-flex flex-column">
            <!-- 标题区域 -->
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片格式转换处理
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    通过sharp库实现图片格式转换，支持png,jpg,hpeg,webp等
                </p>
            </header>
            <main class="function-content d-flex gap-4">
                <div class="function-setting card shadow-sm p-4">
                    <h2 class="h5 fw-semibold mt-4 d-flex align-items-center">
                        操作面板
                    </h2>
                    <FileUpload
                        :multiple="true"
                        class="d-flex flex-column gap-3 my-3"
                    ></FileUpload>
                    <div class="transform-type d-flex align-items-center">
                        <div>转换类型：</div>
                        <el-select
                            v-model="convertType"
                            placeholder="Select"
                        >
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
                        class="start-convert my-3"
                        :disabled="!files.length"
                        @click="start"
                    >
                        开始转换
                    </el-button>
                </div>
                <div class="function-show d-flex flex-column flex-grow-1 gap-2">
                    <div class="text-center">
                        文件列表
                    </div>
                    <div class="file-list d-flex flex-wrap gap-3">
                        <div
                            v-for="file, index in files"
                            :key="file.name"
                            class="file position-relative"
                        >
                            <div
                                v-if="convertFail(file.path)"
                                class="convert-fail position-absolute top-50 start-50"
                            >
                                处理失败
                            </div>
                            <el-icon
                                class="close-btn position-absolute"
                                color="#409EFF"
                                @click="removeFile(index)"
                            >
                                <CircleCloseFilled />
                            </el-icon>
                            <img
                                class="cover"
                                :src="file.path"
                                alt=""
                            >
                            <div
                                class="file-name text-ellipsis"
                                :title="file.name"
                            >
                                {{ file.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
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

const files = computed(() => store.files || [])

const errFiles = computed(() => store.errFiles)

function convertFail(path) {
    return errFiles.value.find(x => x === path)
}

async function start() {
    loading.value = true
    for await (const file of files.value) {
        await convertImage(file.path, convertType.value)
    }
    loading.value = false
}

/**
 * 移除文件
 * @param index
 */
function removeFile(index) {
    store.convertImage = 0
    files.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.image-convert {
  .container {
    width: 1200px;
    .function-content{
        .function-setting{
            width: 460px;
        }
    }
    .path-label{
        min-width: 80px;
    }
    .select-storage-path{
        max-width: 420px;
        height: 40px;
    }
      .function-show {
        .file-list {
          .file {
            .convert-fail{
                font-weight: 500;
                font-size: 12px;
                transform: translate(-50%,-50%);
                color: rgba($color: red, $alpha: .8);
            }
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
</style>
