<template>
    <div class="image-flip">
        <div class="container">
            <!-- 标题区域 -->
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片翻转&旋转
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    <span>翻转：水平翻转，垂直翻转</span>
                    <span>旋转：0-360度角度旋转</span>
                </p>
            </header>
            <div class="func card shadow-sm p-4 mb-3">
                <h2 class="h5 fw-semibold mb-4 d-flex align-items-center">
                    操作面板
                </h2>
                <FileUpload
                    class="d-flex gap-3 align-items-center"
                    :multiple="true"></FileUpload>
                <el-button
                    v-if="files.length"
                    class="mt-3"
                    @click="save"
                >
                    保存图片
                </el-button>
            </div>
            <div class="files d-flex gap-2 flex-wrap">
                <div
                    v-for="file, index in files"
                    :key="file"
                    class="file d-flex flex-column align-items-center border border-primary-subtle rounded-1"
                >
                    <div class="show-img d-flex align-items-center justify-content-center">
                        <!-- <img
                            :style="getImageStyle(options[index])"
                            src="@/assets/images/1.jpg"
                        > -->
                        <img
                            :style="getImageStyle(options[index])"
                            :src="`file://${file.path.replace(/\\/g, '/')}`"
                            alt=""
                        >
                    </div>
                    <div class="func d-flex flex-column row-gap-2 p-2 border-top w-100">
                        <div class="rotate d-flex align-items-center">
                            <div class="title fs-6">
                                角度：
                            </div>
                            <el-input-number
                                v-model="options[index].rotate"
                                :min="0"
                                :max="360"
                            ></el-input-number>
                        </div>
                        <div class="flip d-flex row-gap-2">
                            <el-button
                                :type="options[index].flipX ? 'primary' : ''"
                                @click="options[index].flipX = !options[index].flipX">
                                水平翻转
                            </el-button>
                            <el-button
                                :type="options[index].flipY ? 'primary' : ''"
                                @click="options[index].flipY = !options[index].flipY">
                                垂直翻转
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()

const options = ref([])

const files = computed(() => store.files || [])

watch(files, (val) => {
    if (val.length) {
        options.value = val.map(() => ({
            rotate: 0,
            flipX: false,
            flipY: false
        }))
    }
})

function getImageStyle(img) {
    const transforms = []
    if (img.flipX)
        transforms.push('scaleX(-1)')
    if (img.flipY)
        transforms.push('scaleY(-1)')
    if (img.rotate !== 0)
        transforms.push(`rotate(${img.rotate}deg)`)
    return {
        transform: transforms.join(' '),
        transition: 'transform 0.3s ease'
    }
}

function save() {
    const saveFiles = files.value.map((file, index) => Object.assign({}, { ...file }, { ...options.value[index] }))
    saveFiles.map((file) => {
        window.electronAPI.handleImageFlip(file)
    })
}
</script>

<style lang="scss" scoped>
.image-flip{
    .files{
        .file{
            width: 200px;
            height: 300px;
            .show-img{
                width: 160px;
                // height: 160px;
                flex: 1;
                img{
                    max-width: 160px;
                    max-height: 160px;
                }
            }
        }
    }
}
</style>
