<template>
    <div class="image-size pb-5">
        <div class="container">
            <!-- 标题区域 -->
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片调整大小
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    <span>百分比缩放：效果图按照渲染图进行缩放展示，实际以原图大小处理</span>
                    <span>固定尺寸缩放：以原图像素大小进行设置展示(保持宽高比)，不展示效果图</span>
                </p>
            </header>
            <main class="function-content d-flex gap-3">
                <div class="function-setting card shadow-sm p-4">
                    <h2 class="h5 fw-semibold mb-4 d-flex align-items-center">
                        操作面板
                    </h2>
                    <FileUpload class="d-flex flex-column gap-3"></FileUpload>
                    <div
                        v-if="src"
                        class="func-size mt-3"
                    >
                        <div class="function-method d-flex ">
                            <el-radio-group v-model="fixSize">
                                <el-radio-button
                                    v-for="option in options"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                        <div
                            class="method-func d-flex my-3"
                        >
                            <div
                                v-if="!fixSize"
                                class="size-select d-flex align-items-center"
                            >
                                <el-input-number
                                    v-model="ratio"
                                    :max="100"
                                    :min="1"
                                    @change="handleRatio"
                                ></el-input-number>
                            </div>
                            <div
                                v-if="fixSize"
                                class="size-select d-flex align-items-center"
                            >
                                <div class="settings d-flex flex-column gap-3">
                                    <div class="width d-flex align-items-center">
                                        宽：
                                        <el-input-number
                                            v-model="showSize.width"
                                            :max="Number.parseInt(actualSize.width)"
                                            :min="1"
                                            @change="handleShowWidth"
                                        ></el-input-number>
                                    </div>
                                    <div class="height d-flex align-items-center">
                                        高：
                                        <el-input-number
                                            v-model="showSize.height"
                                            :max="Number.parseInt(actualSize.height)"
                                            :min="1"
                                            @change="handleShowHeight"
                                        ></el-input-number>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-button
                            @click="save"
                        >
                            保存
                        </el-button>
                    </div>
                </div>
                <div
                    v-if="src"
                    class="function-show d-flex align-items-start flex-grow-1 gap-3"
                >
                    <div class="source">
                        <h3 class="h6 fw-medium mb-2 text-center">
                            原始图片
                        </h3>
                        <div class="source-img border border-primary d-flex align-items-center justify-content-center">
                            <img
                                id="source"
                                src="@/assets/images/1.jpg"
                                @load="init"
                            >
                        </div>
                    <!-- <img
                        v-if="src"
                        id="source"
                        :src="`file://${src.replace(/\\/g, '/')}`"
                        alt=""
                        @load="init"
                    > -->
                    </div>
                    <div
                        v-if="!fixSize"
                        class="result"
                    >
                        <h3 class="h6 fw-medium mb-2 text-center">
                            处理后图片
                        </h3>
                        <div class="target-img border border-primary d-flex align-items-center justify-content-center">
                            <img
                                id="target"
                                src="@/assets/images/1.jpg"
                            >
                            <!-- <img
                                v-if="src && !fixSize"
                                id="target"
                                :src="`file://${src.replace(/\\/g, '/')}`"
                            > -->
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

const src = computed(() => store.file?.path || '')

const options = [
    {
        value: false,
        label: '百分比缩放'
    },
    {
        value: true,
        label: '固定尺寸缩放'
    }
]

const fixSize = ref(false)

const ratio = ref(100)

const sourceSize = ref({
    width: 0,
    height: 0
})

const actualSize = ref({
    width: 0,
    height: 0
})

const showSize = ref({
    width: 0,
    height: 0
})

/**
 * 初始化，获取图片渲染宽高和实际宽高（像素）
 */
function init() {
    const source = document.getElementById('source')
    const rect = source.getBoundingClientRect()
    const result = document.getElementsByClassName('result')
    if (result[0]) {
        result[0].style.width = `${rect.width}px`
        result[0].style.height = `${rect.height}px`
    }
    sourceSize.value.width = rect.width
    sourceSize.value.height = rect.height
    actualSize.value.width = source.naturalWidth
    actualSize.value.height = source.naturalHeight
    showSize.value.width = source.naturalWidth
    showSize.value.height = source.naturalHeight
}

/**
 * 保存图片
 */
function save() {
    if (!fixSize.value) {
        const { width, height } = actualSize.value
        window.electronAPI.changeImageSize({
            path: src.value,
            size: {
                width: Number.parseInt(width * (ratio.value / 100)),
                height: Number.parseInt(height * (ratio.value / 100))
            }
        })
    }
    else if (fixSize.value) {
        const { width, height } = showSize.value
        window.electronAPI.changeImageSize({ path: src.value, size: { width, height } })
    }
}

/**
 * 更新效果图大小
 * @param value
 */
function handleRatio(value) {
    const { width, height } = sourceSize.value
    const target = document.getElementById('target')
    if (target) {
        target.style.width = `${width * (value / 100)}px`
        target.style.height = `${height * (value / 100)}px`
    }
}

/**
 * 固定宽高比-宽度改变
 * @param val
 */
function handleShowWidth(val) {
    const { width, height } = sourceSize.value
    const ratio = width / height
    showSize.value.height = Number.parseInt(val / ratio)
}

/**
 * 固定宽高比-高度改变
 * @param val
 */
function handleShowHeight(val) {
    const { width, height } = sourceSize.value
    const ratio = width / height
    showSize.value.width = Number.parseInt(val * ratio)
}
</script>

<style lang="scss" scoped>
.image-size{
    .source-img,
    .target-img{
        width: 300px;
        height: 600px;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .container{
        .function-setting{
            width: 460px;
        }
    }
    .function-show{
        height: 600px;
        .func-size{
            row-gap: 12px;
            .size-select{
                column-gap: 8px;
                .settings{
                    row-gap: 12px;
                }
                .label{
                    min-width: 120px;
                }
                .el-input{
                    width: 120px;
                }
            }
            .function-method{
                min-width: 240px;
            }
        }
    }
}
</style>
