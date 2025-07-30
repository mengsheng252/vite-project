<template>
    <div class="image-sharpen py-5 px-3">
        <!-- 标题区域 -->
        <header class="text-center mb-5">
            <h1 class="display-5 fw-bold text-dark mb-3">
                图片锐化与模糊处理
            </h1>
            <p class="text-muted col-md-8 mx-auto">
                通过Canvas实现的图片处理工具，支持锐化和模糊效果调节
            </p>
        </header>

        <!-- 主要内容区 -->
        <div class="main d-flex gap-4">
            <!-- 操作面板 -->
            <div class="func">
                <div class="card shadow-sm p-4">
                    <h2 class="h5 fw-semibold mb-4 d-flex align-items-center">
                        操作面板
                    </h2>

                    <!-- 图片上传 -->
                    <div class="mb-4">
                        <label class="form-label small fw-medium mb-1">选择图片</label>
                        <input
                            type="file"
                            accept="image/*"
                            class="form-control form-control-sm"
                            @change="handleImageUpload"
                        >
                    </div>

                    <!-- 强度调节 -->
                    <div class="mb-4">
                        <label class="form-label small fw-medium mb-1">
                            效果强度: {{ intensity }}
                        </label>
                        <input
                            v-model="intensity"
                            type="range"
                            min="0"
                            max="10"
                            class="form-range"
                        >
                    </div>

                    <!-- 操作按钮 -->
                    <div class="d-grid gap-2">
                        <button
                            class="btn btn-primary"
                            :disabled="!imageLoaded"
                            @click="applySharpen"
                        >
                            <i class="bi bi-sharp me-1"></i> 锐化图片
                        </button>
                        <button
                            class="btn btn-secondary"
                            :disabled="!imageLoaded"
                            @click="applyBlur"
                        >
                            <i class="bi bi-filter me-1"></i> 模糊图片
                        </button>
                        <button
                            class="btn btn-outline-secondary"
                            :disabled="!imageLoaded"
                            @click="resetImage"
                        >
                            <i class="bi bi-arrow-clockwise me-1"></i> 重置
                        </button>
                    </div>
                </div>
            </div>

            <!-- 图片显示区 -->
            <div class="show-img d-flex gap-2">
                <!-- 原始图片 -->
                <div class="source d-flex flex-column">
                    <h3 class="h6 fw-medium mb-2 text-center">
                        原始图片
                    </h3>
                    <div class="border flex-grow-1 rounded-lg overflow-hidden bg-white p-1">
                        <canvas
                            ref="originalCanvas"
                            class="w-100 h-auto"
                        ></canvas>
                        <div
                            v-if="!imageLoaded"
                            class="py-16 text-center text-muted"
                        >
                            <i class="bi bi-image display-1 mb-2"></i>
                            <p>请上传图片</p>
                        </div>
                    </div>
                </div>

                <!-- 处理后图片 -->
                <div class="target d-flex flex-column">
                    <h3 class="h6 fw-medium mb-2 text-center">
                        处理后图片
                    </h3>
                    <div class="border flex-grow-1 rounded-lg overflow-hidden bg-white p-1">
                        <canvas
                            ref="processedCanvas"
                            class="w-100 h-auto"
                        ></canvas>
                        <div
                            v-if="!imageProcessed && imageLoaded"
                            class="py-16 text-center text-muted"
                        >
                            <i class="bi bi-magic display-1 mb-2"></i>
                            <p>点击按钮处理图片</p>
                        </div>
                        <div
                            v-if="!imageLoaded"
                            class="py-16 text-center text-muted"
                        >
                            <i class="bi bi-image display-1 mb-2"></i>
                            <p>请先上传图片</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 说明区域 -->
        <div class="card shadow-sm mt-5 p-4">
            <h3 class="h5 fw-semibold mb-3">
                技术说明
            </h3>
            <ul class="text-muted list-unstyled">
                <li class="mb-2">
                    <i class="bi bi-info-circle text-primary me-2"></i>
                    <strong>锐化原理</strong>：通过卷积核增强图像边缘对比度
                </li>
                <li class="mb-2">
                    <i class="bi bi-info-circle text-primary me-2"></i>
                    <strong>模糊原理</strong>：使用高斯卷积核进行图像平滑处理
                </li>
                <li>
                    <i class="bi bi-info-circle text-primary me-2"></i>
                    <strong>处理方式</strong>：所有处理均在客户端完成，图片不会上传到服务器
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式状态
const intensity = ref(1)
const imageLoaded = ref(false)
const imageProcessed = ref(false)
const originalCanvas = ref(null)
const processedCanvas = ref(null)
let originalImageData = null

// 处理图片上传
function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file)
        return

    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
            // 计算合适的尺寸
            const maxSize = 500
            let width = img.width
            let height = img.height

            // 按比例缩放
            if (width > height && width > maxSize) {
                height *= maxSize / width
                width = maxSize
            }
            else if (height > maxSize) {
                width *= maxSize / height
                height = maxSize
            }

            // 设置Canvas尺寸
            originalCanvas.value.width = width
            originalCanvas.value.height = height
            processedCanvas.value.width = width
            processedCanvas.value.height = height

            // 绘制原始图片
            const originalCtx = originalCanvas.value.getContext('2d')
            originalCtx.drawImage(img, 0, 0, width, height)
            originalImageData = originalCtx.getImageData(0, 0, width, height)

            // 更新状态
            imageLoaded.value = true
            imageProcessed.value = false
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(file)
}

// 锐化处理
function applySharpen() {
    if (!originalImageData)
        return

    // 锐化卷积核
    const kernel = [
        [0, -intensity.value, 0],
        [-intensity.value, 1 + 4 * intensity.value, -intensity.value],
        [0, -intensity.value, 0]
    ]

    applyConvolution(kernel)
    imageProcessed.value = true
}

// 模糊处理
function applyBlur() {
    if (!originalImageData)
        return

    // 强度为0时显示原图
    if (intensity.value === 0) {
        resetImage()
        return
    }

    // 创建高斯核
    const kernelSize = Math.max(3, 2 * Math.floor(intensity.value) + 1)
    const sigma = Math.max(0.5, intensity.value * 0.8)
    const kernel = createGaussianKernel(kernelSize, sigma)

    applyConvolution(kernel)
    imageProcessed.value = true
}

// 重置图片
function resetImage() {
    if (originalImageData && processedCanvas.value) {
        const processedCtx = processedCanvas.value.getContext('2d')
        processedCtx.putImageData(originalImageData, 0, 0)
        imageProcessed.value = false
    }
}

// 创建高斯模糊核
function createGaussianKernel(size, sigma) {
    const kernel = []
    const center = Math.floor(size / 2)
    let sum = 0

    // 生成高斯矩阵
    for (let y = 0; y < size; y++) {
        kernel[y] = []
        for (let x = 0; x < size; x++) {
            const dx = x - center
            const dy = y - center
            const value = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
            kernel[y][x] = value
            sum += value
        }
    }

    // 防止除零错误
    if (sum <= 0) {
        const avgValue = 1 / (size * size)
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                kernel[y][x] = avgValue
            }
        }
        sum = 1
    }

    // 归一化
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            kernel[y][x] /= sum
        }
    }

    return kernel
}

// 应用卷积操作
function applyConvolution(kernel) {
    if (!originalImageData)
        return

    const width = originalImageData.width
    const height = originalImageData.height
    const data = originalImageData.data
    const kernelSize = kernel.length
    const halfKernel = Math.floor(kernelSize / 2)

    // 创建新图像数据
    const processedCtx = processedCanvas.value.getContext('2d')
    const newImageData = processedCtx.createImageData(width, height)
    const newData = newImageData.data

    // 应用卷积
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0
            let g = 0
            let b = 0

            // 卷积计算
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    // 计算坐标并处理边界
                    const px = x + kx - halfKernel
                    const py = y + ky - halfKernel
                    const clampedX = Math.max(0, Math.min(px, width - 1))
                    const clampedY = Math.max(0, Math.min(py, height - 1))

                    const index = (clampedY * width + clampedX) * 4
                    const weight = kernel[ky][kx]

                    r += data[index] * weight
                    g += data[index + 1] * weight
                    b += data[index + 2] * weight
                }
            }

            // 设置像素值
            const index = (y * width + x) * 4
            newData[index] = Math.max(0, Math.min(Math.round(r), 255))
            newData[index + 1] = Math.max(0, Math.min(Math.round(g), 255))
            newData[index + 2] = Math.max(0, Math.min(Math.round(b), 255))
            newData[index + 3] = 255 // 不透明度
        }
    }

    // 绘制处理后的图像
    processedCtx.putImageData(newImageData, 0, 0)
}
</script>

<style scoped>
/* 组件局部样式 */
.card {
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn {
  transition: all 0.2s ease;
}

canvas {
  display: block;
}
</style>
