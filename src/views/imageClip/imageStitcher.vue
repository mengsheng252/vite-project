<template>
    <div class="image-stitcher">
        <div class="container">
            <header class="mb-6 text-center">
                <h1 class="display-5 fw-bold text-dark mb-2">
                    图片拼接工具
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    <span>上传多张图片，选择拼接方向和间距，将图片合并为一张</span>
                    <span>一次上传多张，重新上传覆盖处理</span>
                </p>
            </header>
            <div class="function-content d-flex flex-column gap-3">
                <!-- 控制面板 -->
                <div class="function-setting card shadow-sm p-4 h-100">
                    <h2 class="h5 fw-semibold mb-4">
                        拼接设置
                    </h2>
                    <div class="func d-flex justify-content-between align-items-start gap-3">
                        <div class="left flex-grow-1">
                            <!-- 图片上传 -->
                            <FileUpload
                                class="d-flex flex-column gap-3"
                                :multiple="true"
                            ></FileUpload>
                            <!-- 拼接方向 -->
                            <div class="mb-4">
                                <label class="form-label fw-medium mb-2">拼接方向</label>
                                <div class="d-flex gap-2">
                                    <div class="form-check form-check-inline flex-fill">
                                        <input
                                            id="horizontal"
                                            v-model="direction"
                                            class="form-check-input"
                                            type="radio"
                                            value="horizontal"
                                        >
                                        <label
                                            class="form-check-label w-100 text-center p-2 border rounded cursor-pointer"
                                            for="horizontal"
                                        >
                                            横向拼接
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline flex-fill">
                                        <input
                                            id="vertical"
                                            v-model="direction"
                                            class="form-check-input"
                                            type="radio"
                                            value="vertical"
                                        >
                                        <label
                                            class="form-check-label w-100 text-center p-2 border rounded cursor-pointer"
                                            for="vertical">
                                            纵向拼接
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- 间距设置 -->
                            <div class="mb-4">
                                <label class="form-label fw-medium mb-2">
                                    图片间距: {{ spacing }}px
                                </label>
                                <input
                                    v-model="spacing"
                                    type="range"
                                    min="0"
                                    max="50"
                                    class="form-range"
                                >
                            </div>
                        </div>
                        <div class="right flex-grow-1">
                            <!-- 背景颜色 -->
                            <div class="mb-4">
                                <label class="form-label fw-medium mb-2">背景颜色</label>
                                <div class="d-flex gap-2 align-items-center">
                                    <input
                                        v-model="bgColor"
                                        type="color"
                                        class="form-control form-control-color w-10 h-10 p-0"
                                        title="选择背景色"
                                    >
                                    <input
                                        v-model="bgColor"
                                        type="text"
                                        class="form-control"
                                    >
                                </div>
                            </div>
                            <el-radio-group v-model="useMax">
                                <el-radio-button :value="true">
                                    使用最大边
                                </el-radio-button>
                                <el-radio-button :value="false">
                                    使用最小边
                                </el-radio-button>
                            </el-radio-group>
                            <!-- 操作按钮 -->
                            <div class="d-grid gap-2">
                                <!-- <span v-if="loading">
                                    <span
                                        class="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    拼接中...
                                </span> -->
                                <el-button
                                    type="primary"
                                    class="py-2"
                                    :disabled="files.length < 2 || loading"
                                    @click="stitchfiles"
                                >
                                    开始拼接
                                </el-button>
                                <el-button
                                    type="secondary"
                                    class="py-2"
                                    :disabled="!resultImage"
                                    @click="downloadResult"
                                >
                                    <i class="bi bi-download me-2"></i>下载结果
                                </el-button>
                                <el-button
                                    type="outline-secondary"
                                    class="py-2"
                                    :disabled="files.length === 0"
                                    @click="clearAll"
                                >
                                    <i class="bi bi-trash me-2"></i>清空图片
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 图片预览区 -->
                <div class="function-show">
                    <div class="row gap-4">
                        <!-- 待拼接图片 -->
                        <div class="col-12">
                            <div class="card shadow-sm p-4">
                                <h2 class="h5 fw-semibold mb-3">
                                    待拼接图片
                                    <span class="badge bg-secondary">{{ files.length }}</span>
                                </h2>

                                <div
                                    v-if="files.length < 2"
                                    class="py-10 text-center text-muted">
                                    <i class="bi bi-files text-4xl mb-2"></i>
                                    <p>请上传至少两张图片</p>
                                </div>

                                <div
                                    v-else
                                    class="d-flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                                    <div
                                        v-for="(file, index) in files"
                                        :key="index"
                                        class="position-relative d-flex align-items-start"
                                    >
                                        <img
                                            :src="file.path"
                                            alt="待拼接图片"
                                            class="source h-20 object-cover rounded border"
                                        >
                                        <button
                                            class="position-absolute top-0 end-0 translate-middle-x -translate-y-1/2 bg-danger text-white rounded-full w-5 h-5 d-flex align-items-center justify-content-center p-0 border-0 text-xs opacity-0 hover:opacity-100 transition-opacity"
                                            aria-label="删除图片"
                                            @click="removeImage(index)"
                                        >
                                            <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 拼接结果 -->
                        <div class="col-12">
                            <div class="card shadow-sm p-4">
                                <h2 class="h5 fw-semibold mb-3">
                                    拼接结果
                                </h2>

                                <div
                                    v-if="!resultImage"
                                    class="py-10 text-center text-muted">
                                    <i class="bi bi-image text-4xl mb-2"></i>
                                    <p>拼接后的图片将显示在这里</p>
                                </div>

                                <div
                                    v-else
                                    class="d-flex justify-content-center"
                                >
                                    <div class="bg-light p-3 rounded overflow-auto max-h-80">
                                        <img
                                            :src="resultImage"
                                            alt="拼接结果"
                                            class="max-w-full max-h-[300px] object-contain rounded"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()

const files = computed(() => store.files || [])

// 状态管理
const resultImage = ref('') // 拼接结果图片URL
const direction = ref('horizontal') // 拼接方向
const spacing = ref(10) // 图片间距
const bgColor = ref('#ffffff') // 背景颜色
const loading = ref(false) // 加载状态
const useMax = ref(true) // 使用最大边

// 移除单张图片
function removeImage(index) {
    files.value.splice(index, 1)
}

// 清空所有图片
function clearAll() {
    files.value = []
    resultImage.value = ''
}

// 拼接图片
async function stitchfiles() {
    if (files.value.length < 2)
        return

    loading.value = true
    try {
    // 创建一个Promise数组，等待所有图片加载完成
        const imageElements = await Promise.all(
            files.value.map(img => new Promise((resolve) => {
                const imgEl = new Image()
                imgEl.onload = () => resolve(imgEl)
                imgEl.src = img.url
            }))
        )

        // 计算拼接后的画布尺寸
        let canvasWidth = 0
        let canvasHeight = 0

        // // 最大宽高
        const maxWidth = Math.max(...files.value.map(file => file.width))
        const maxHeight = Math.max(...files.value.map(file => file.height))
        // 最小宽高
        const minWidth = Math.min(...files.value.map(file => file.width))
        const minHeight = Math.min(...files.value.map(file => file.height))

        if (direction.value === 'horizontal') {
            // 横向拼接：高度取最大，宽度累加
            if (useMax.value) {
                canvasHeight = maxHeight + 2
            }
            else {
                canvasHeight = minHeight + 2
            }
            canvasWidth = files.value.reduce((sum, img) => sum + img.width, 0) + (files.value.length - 1) * spacing.value + 2
        }
        else {
            // 纵向拼接：宽度取最大，高度累加
            // canvasWidth = Math.max(...files.value.map(img => img.width)) + 2
            if (useMax.value) {
                canvasWidth = maxWidth + 2
            }
            else {
                canvasWidth = minWidth + 2
            }
            canvasHeight = files.value.reduce((sum, img) => sum + img.height, 0) + (files.value.length - 1) * spacing.value + 2
        }

        // 创建画布并绘制
        const canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')

        // 绘制背景
        ctx.fillStyle = bgColor.value
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        // 绘制图片
        let currentX = 1
        let currentY = 1

        imageElements.forEach((img, index) => {
            const imgInfo = files.value[index]

            ctx.drawImage(img, currentX, currentY, imgInfo.width, imgInfo.height)

            // 更新下一张图片的位置
            if (direction.value === 'horizontal') {
                currentX += imgInfo.width + spacing.value
            }
            else {
                currentY += imgInfo.height + spacing.value
            }
        })

        // 将拼接结果转为图片URL
        resultImage.value = canvas.toDataURL('image/png')
    }
    catch (error) {
        console.error('图片拼接失败:', error)
    }
    finally {
        loading.value = false
    }
}

// 下载拼接结果
function downloadResult() {
    if (!resultImage.value)
        return

    const link = document.createElement('a')
    link.download = `拼接图片-${new Date().getTime()}.png`
    link.href = resultImage.value
    link.click()
}
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

/* 自定义表单样式 */
.form-check-input:checked + .form-check-label {
  background-color: #e9f5ff;
  border-color: #3b82f6;
}

.form-check-label {
  transition: all 0.2s ease;
}

.image-stitcher{
    .container{
        .function-content{
            .card{
                width: 1200px;
            }
            .function-show{
                .source{
                    max-width: 100px;
                    height: auto;
                }
            }
        }
    }
}
</style>
