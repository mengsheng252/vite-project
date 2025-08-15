<template>
    <div class="image-compress">
        <div class="container">
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片质量压缩
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    缩小图片占用大小
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
                    <div
                        v-if="files.length"
                        class="my-3"
                    >
                        <label>压缩质量：</label>
                        <el-input-number
                            v-model="quality"
                            :max="100"
                            :min="10"
                            :step="10"
                        ></el-input-number>
                        <el-button
                            class="mx-3"
                            type="primary"
                            @click="start"
                        >
                            开始压缩
                        </el-button>
                    </div>
                </div>
                <div
                    v-if="files.length"
                    class="files d-flex flex-wrap gap-3"
                >
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
            </main>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()
const files = computed(() => store.files || [])
const errFiles = computed(() => store.errFiles)
const quality = ref(80)

function convertFail(path) {
    return errFiles.value.find(x => x === path)
}

/**
 * 移除文件
 * @param index
 */
function removeFile(index) {
    store.convertImage = 0
    files.value.splice(index, 1)
}

async function start() {
    for await (const file of files.value) {
        const options = Object.assign({}, file, { quality: quality.value })
        console.log('--', options)
        await window.electronAPI.imageCompress(options)
    }
}
</script>

<style lang="scss" scoped>
.image-compress {
    .function-content{
        .func{
            min-width: 460px;
        }
    }
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
</style>
