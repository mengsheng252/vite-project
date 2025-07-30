<template>
    <div class="img-crop d-flex flex-column">
        <div class="func-btn d-flex align-items-center">
            <el-button
                type="primary"
                @click="crop">
                裁剪
            </el-button>
            <el-button
                v-if="cropSrc"
                type="primary"
                @click="saveImage(cropSrc)"
            >
                下载
            </el-button>
        </div>
        <div class="content-show d-flex justify-content-between">
            <div class="crop-container d-flex justify-content-center align-items-center">
                <!-- 底图 -->
                <img
                    id="imagePreview"
                    :src="`file://${src.replace(/\\/g, '/')}`"
                    @load="init">
                <!-- <img id="imagePreview" src="@/assets/images/1.jpg" @load="init"> -->
                <div class="crop-overlay">
                    <!-- 遮罩 -->
                    <div class="mask"></div>
                    <div
                        id="cropArea"
                        class="crop-area">
                        <!-- 对照图片 -->
                        <div class="warpper">
                            <!-- <img id="compareImg" src="@/assets/images/1.jpg" alt=""> -->
                            <img
                                id="compareImg"
                                :src="`file://${src.replace(/\\/g, '/')}`"
                                alt="">
                        </div>
                        <div
                            id="handleTL"
                            class="crop-handle"></div>
                        <div
                            id="handleTR"
                            class="crop-handle"></div>
                        <div
                            id="handleBL"
                            class="crop-handle"></div>
                        <div
                            id="handleBR"
                            class="crop-handle"></div>
                    </div>
                </div>
            </div>
            <div class="show-crop-image d-flex justify-content-center align-items-center">
                <canvas id="cropCanvas"></canvas>
                <img
                    v-if="cropSrc"
                    id="cropResult"
                    :src="cropSrc"
                    alt="裁剪结果"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { saveImage } from '@/hooks/useCommon'

defineProps({
    src: {
        type: String,
        required: true
    }
})

const cropSrc = ref('')

let cropArea
let compareImg
let imageRect

let cropRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}
let activeHandle = ''
let handles = {}

const start = {
    x: 0,
    y: 0
}

function removeEventListener() {
    for (const handle in handles) {
        if (handle) {
            handles[handle].removeEventListener('mousedown', mousedown)
        }
    }
}

function mousedown(e) {
    document.addEventListener('mousemove', mousemove)
    activeHandle = e.target
    // 记录起始位置
    start.x = e.clientX
    start.y = e.clientY
    document.addEventListener('mouseup', mouseup)
}

function mousemove(e) {
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    // 四个手柄是根据裁剪区域定位四个角落，所以只需要更新裁剪区域即可
    // 50为控制最小裁剪区域
    if (activeHandle === handles.tl) {
    // 左上角手柄
        if (cropRect.width - dx >= 50 && cropRect.x + dx >= 0) {
            cropRect.x += dx
            cropRect.width -= dx
        }
        if (cropRect.height - dy >= 50 && cropRect.y + dy >= 0) {
            cropRect.y += dy
            cropRect.height -= dy
        }
    }
    if (activeHandle === handles.tr) {
    // 右上角手柄  计算移动之后位置未超出限制区域才进行计算
        if (cropRect.width + dx >= 50 && cropRect.width + dx + cropRect.x <= imageRect.width) {
            cropRect.width += dx
        }
        if (cropRect.height - dy >= 50 && cropRect.y + dy >= 0) {
            cropRect.y += dy
            cropRect.height -= dy
        }
    }
    if (activeHandle === handles.bl) {
    // 左下角手柄
        if (cropRect.width - dx >= 50 && cropRect.x + dx >= 0) {
            cropRect.x += dx
            cropRect.width -= dx
        }
        if (cropRect.height + dy >= 50 && cropRect.height + dy + cropRect.y <= imageRect.height) {
            cropRect.height += dy
        }
    }
    if (activeHandle === handles.br) {
    // 右下角手柄
        if (cropRect.width + dx >= 50 && cropRect.width + dx + cropRect.x <= imageRect.width) {
            cropRect.width += dx
        }
        if (cropRect.height + dy >= 50 && cropRect.height + dy + cropRect.y <= imageRect.height) {
            cropRect.height += dy
        }
    }
    // 拖动整个裁剪区域，避免移出图片外
    if (activeHandle === cropArea) {
        const x1 = cropRect.x + dx
        const x2 = x1 + cropRect.width
        const y1 = cropRect.y + dy
        const y2 = y1 + cropRect.height
        if (x1 >= 0 && y1 >= 0 && x2 <= imageRect.width && y2 <= imageRect.height) {
            cropRect.x += dx
            cropRect.y += dy
        }
    }
    updateCropRect()
    start.x = e.clientX
    start.y = e.clientY
}

function mouseup() {
    document.removeEventListener('mousemove', mousemove)
}

function init() {
    // 清除监听事件
    removeEventListener()
    //
    cropArea = document.getElementById('cropArea')
    compareImg = document.getElementById('compareImg')
    const image = document.getElementById('imagePreview')
    imageRect = image.getBoundingClientRect()
    cropRect = {
        x: imageRect.width * 0.25,
        y: imageRect.height * 0.25,
        width: imageRect.width * 0.5,
        height: imageRect.height * 0.5
    }
    // 设置对照图片的宽高和定位
    compareImg.style.width = `${imageRect.width}px`
    compareImg.style.height = `${imageRect.height}px`
    // 设置裁剪区域crop-overlay的定位
    const cropOverlay = document.getElementsByClassName('crop-overlay')[0]
    cropOverlay.style.left = `${(540 - imageRect.width) / 2}px`
    cropOverlay.style.top = `${(540 - imageRect.height) / 2}px`
    cropOverlay.style.width = `${imageRect.width}px`
    cropOverlay.style.height = `${imageRect.height}px`
    // 获取四个手柄,添加监听事件
    handles = {
        tl: document.getElementById('handleTL'),
        tr: document.getElementById('handleTR'),
        bl: document.getElementById('handleBL'),
        br: document.getElementById('handleBR')
    }
    for (const handle in handles) {
        handles[handle].addEventListener('mousedown', mousedown)
    }
    // 监听裁剪区域拖动事件
    cropArea.addEventListener('mousedown', mousedown)
    updateCropRect()
}

function updateCropRect() {
    cropArea.style.left = `${cropRect.x}px`
    cropArea.style.top = `${cropRect.y}px`
    cropArea.style.width = `${cropRect.width}px`
    cropArea.style.height = `${cropRect.height}px`
    // 设置对照图片的定位
    compareImg.style.left = `${-cropRect.x}px`
    compareImg.style.top = `${-cropRect.y}px`
}

function crop() {
    const image = document.getElementById('imagePreview')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 获取图片实际像素和显示像素
    const naturalWidth = image.naturalWidth
    const naturalHeight = image.naturalHeight
    const imageRect = image.getBoundingClientRect()
    const scaleX = naturalWidth / imageRect.width
    const scaleY = naturalHeight / imageRect.height

    // 计算实际像素的裁剪区域
    const sx = cropRect.x * scaleX
    const sy = cropRect.y * scaleY
    const sw = cropRect.width * scaleX
    const sh = cropRect.height * scaleY

    // 设置canvas尺寸为裁剪区域的实际像素
    canvas.width = sw
    canvas.height = sh

    ctx.drawImage(
        image,
        sx,
        sy,
        sw,
        sh, // 源图像的裁剪区域（实际像素）
        0,
        0,
        sw,
        sh // 画到canvas的区域
    )

    // 返回Base64数据
    cropSrc.value = canvas.toDataURL('image/jpeg', 0.92)
}

defineExpose({ crop, cropSrc })
</script>

<style lang="scss" scoped>
svg {
  vertical-align: unset;
}
.img-crop {
    row-gap: 24px;
  .crop-container {
    width: 540px;
    height: 540px;
    position: relative;
    display: inline-block;
  }

  .func-btn {
    column-gap: 24px;
  }

  #imagePreview {
    max-width: 100%;
    max-height: 100%;
    display: block;
    user-select: none;
  }

  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  .crop-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
    #compareImg {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      pointer-events: none;
    }
  }

  .crop-area {
    position: absolute;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    border: 2px dashed blue;
    box-sizing: border-box;
    z-index: 10;
    cursor: move;
    .warpper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      pointer-events: none;
    }
  }

  .crop-handle {
    width: 14px;
    height: 14px;
    position: absolute;
    // transform: translate(-50%, -50%); /* 让中心点对准目标位置 */
    background-color: white;
    border-radius: 50%;
    cursor: move;
    z-index: 3;
  }

  #handleTL {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  #handleTR {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  #handleBL {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  #handleBR {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
  }

  #cropCanvas {
    display: none;
  }

  .show-crop-image {
    width: 540px;
    height: 540px;
    #cropResult {
      max-width: 100%;
      max-height: 100%;
      display: block;
      background-color: #ccc;
    }
  }
}
</style>
