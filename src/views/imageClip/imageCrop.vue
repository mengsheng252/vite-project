<template>
    <div
        v-loading="loading"
        class="image-crop p-3"
    >
        <div class="container">
            <!-- 标题区域 -->
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片裁剪
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    手动选择裁剪图片，拖拽按钮调整裁剪区域与大小
                </p>
            </header>
            <div class="main d-flex flex-column gap-3">
                <img-crop
                    v-if="src"
                    ref="cropRef"
                    :src="src"
                ></img-crop>
                <div class="func card shadow-sm p-4 d-flex flex-row gap-3 align-items-center">
                    <h2 class="h5 fw-semibold d-flex align-items-center">
                        操作面板
                    </h2>
                    <FileUpload class="d-flex align-items-center gap-3"></FileUpload>
                    <el-button
                        type="primary"
                        @click="crop"
                    >
                        裁剪
                    </el-button>
                    <el-button
                        type="primary"
                        class="m-0"
                        @click="save"
                    >
                        下载
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import imgCrop from '@/components/imgCrop.vue'
import { useStore } from '@/hooks/stores'

const loading = ref(false)
const store = useStore()

const src = computed(() => store.file || '')

const cropRef = ref()

function crop() {
    cropRef.value.crop()
}

function save() {
    cropRef.value.save()
}
</script>

<style lang="scss" scoped>
.image-crop{
    user-select: none;
}
</style>
