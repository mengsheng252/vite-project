<template>
    <div class="image-size">
        <div>改变图片大小</div>
        <div class="desc">
            <div>等比例缩放：效果图按照渲染图进行缩放展示，实际以原图大小处理</div>
            <div>固定宽高缩放：以原图像素大小进行设置展示(保持宽高比)，不展示效果图</div>
        </div>
        <FileUpload></FileUpload>
        <div
            v-if="src"
            class="content d-flex align-items-start">
            <img
                id="source"
                src="@/assets/images/1.jpg"
                @load="init">
            <!-- <img v-if="src" id="source" :src="`file://${src.replace(/\\/g, '/')}`" alt="" @load="init"> -->
            <div class="func-size d-flex flex-column h-100 mx-3">
                <!-- <el-select
                    v-model="method"
                    placeholder="Select"
                    style="width: 240px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select> -->
                <div class="methods d-flex justify-content-between">
                    <el-button
                        v-for="option, index in options"
                        :key="option.value"
                        :type="index + 1 === method ? 'primary' : ''"
                        @click="method = option.value"
                    >
                        {{ option.label }}
                    </el-button>
                </div>
                <div
                    v-if="method === 1"
                    class="size-select d-flex align-items-center">
                    <el-input-number
                        v-model="ratio"
                        :max="100"
                        :min="1"
                        @change="handleRatio"></el-input-number>
                    <div>%</div>
                </div>
                <div
                    v-if="method === 2"
                    class="size-select d-flex align-items-center">
                    <div class="settings d-flex flex-column">
                        <div class="width d-flex align-items-center">
                            宽：
                            <el-input-number
                                v-model="showSize.width"
                                :max="Number.parseInt(actualSize.width)"
                                :min="1"
                                @change="handleShowWidth"></el-input-number>
                        </div>
                        <div class="height d-flex align-items-center">
                            高：
                            <el-input-number
                                v-model="showSize.height"
                                :max="Number.parseInt(actualSize.height)"
                                :min="1"
                                @change="handleShowHeight"></el-input-number>
                        </div>
                    </div>
                </div>
                <el-button @click="save">
                    保存
                </el-button>
            </div>
            <div class="result d-flex justify-content-center align-items-center">
                <img
                    v-if="method === 1"
                    id="target"
                    src="@/assets/images/1.jpg">
                <!-- <img v-if="src && method === 1" id="target" :src="`file://${src.replace(/\\/g, '/')}`"> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()

const src = computed(() => store.file || '')

const method = ref(1)

const options = [
    {
        value: 1,
        label: '百分比缩放'
    },
    {
        value: 2,
        label: '固定尺寸缩放'
    }
]

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
    if (method.value === 1) {
        const { width, height } = actualSize.value
        window.electronAPI.changeImageSize({
            path: src.value,
            size: {
                width: Number.parseInt(width * (ratio.value / 100)),
                height: Number.parseInt(height * (ratio.value / 100))
            }
        })
    }
    else if (method.value === 2) {
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
    img{
        max-width: 300px;
        max-height: 600px;
    }
    .content{
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
            .methods{
                min-width: 240px;
            }
        }
    }
}
</style>
