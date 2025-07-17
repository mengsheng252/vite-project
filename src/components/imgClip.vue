<template>
    <div class="img-clip">
        <div class="crop-container">
            <!-- <img id="imagePreview" :src="`file://${src.replace(/\\/g, '/')}`" alt="预览图片"> -->
            <img id="imagePreview" src="@/assets/images/1.jpg" alt="预览图片">
            <div class="crop-overlay">
                <div id="cropArea" class="crop-area">
                    <div id="handleTL" class="crop-handle"></div>
                    <div id="handleTR" class="crop-handle"></div>
                    <div id="handleBL" class="crop-handle"></div>
                    <div id="handleBR" class="crop-handle"></div>
                </div>
            </div>
        </div>
        <el-button id="cropButton" type="primary">
            裁剪
        </el-button>
        <canvas id="cropCanvas" style="display: none"></canvas>
        <img id="cropResult" src="" alt="裁剪结果">
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

defineProps({
    src: {
        type: String,
        required: true
    }
})

function init() {
    const image = document.getElementById('imagePreview')
    let activeHandle = ''
    const start = {
        x: 0,
        y: 0
    }
    image.onload = () => {
        const cropArea = document.getElementById('cropArea')
        const imageRect = image.getBoundingClientRect()
        const cropRect = {
            x: 0,
            y: 0,
            width: imageRect.width * 0.5,
            height: imageRect.height * 0.5
        }
        // 获取四个手柄,添加监听事件
        const handles = {
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
        function updateCropRect() {
            // console.log('imageRect ', imageRect)
            // console.log('cropRect ', cropRect)
            // cropArea.style.width = `${cropRect.width - cropRect.x}px`
            // cropArea.style.height = `${cropRect.height - cropRect.y}px`
            cropArea.style.left = `${cropRect.x}px`
            cropArea.style.top = `${cropRect.y}px`
            cropArea.style.width = `${cropRect.width}px`
            cropArea.style.height = `${cropRect.height}px`

            // 更新手柄位置
            // handles.tl.style.left = '0px'
            // handles.tl.style.top = '0px'

            // handles.tr.style.left = `${cropRect.width - 16}px`
            // handles.tr.style.top = '0px'

            // handles.bl.style.left = '0px'
            // handles.bl.style.top = `${cropRect.height - 16}px`

            // handles.br.style.left = `${cropRect.width - 16}px`
            // handles.br.style.top = `${cropRect.height - 16}px`
        }

        function mousedown(e) {
            document.addEventListener('mousemove', mousemove)
            console.log('mousedown', e.target)
            activeHandle = e.target
            // 记录起始位置
            start.x = e.clientX
            start.y = e.clientY
            document.addEventListener('mouseup', mouseup)
        }

        function mouseup() {
            document.removeEventListener('mousemove', mousemove)
        }

        function mousemove(e) {
            console.log('mousemove', e)
            const dx = e.clientX - start.x
            const dy = e.clientY - start.y
            // 四个手柄是根据裁剪区域定位四个角落，所以只需要更新裁剪区域即可
            // 50为控制最小裁剪区域
            if (activeHandle === handles.tl) {
                // 左上角手柄
                if (cropRect.width - dx >= 50) {
                    cropRect.x += dx
                    cropRect.width -= dx
                }
                if (cropRect.height - dy >= 50) {
                    cropRect.y += dy
                    cropRect.height -= dy
                }
            }
            if (activeHandle === handles.tr) {
                // 右上角手柄
                if (cropRect.width + dx >= 50) {
                    cropRect.width += dx
                }
                if (cropRect.height - dy >= 50) {
                    cropRect.y += dy
                    cropRect.height -= dy
                }
            }
            if (activeHandle === handles.bl) {
                // 左下角手柄
                if (cropRect.width + dx >= 50) {
                    cropRect.x += dx
                    cropRect.width -= dx
                }
                if (cropRect.height + dy >= 50) {
                    cropRect.height += dy
                }
            }
            if (activeHandle === handles.br) {
                // 右下角手柄
                if (cropRect.width + dx >= 50) {
                    cropRect.width += dx
                }
                if (cropRect.height + dy >= 50) {
                    cropRect.height += dy
                }
            }
            if (activeHandle === cropArea) {
                cropRect.x += dx
                cropRect.y += dy
            }
            updateCropRect()
            start.x = e.clientX
            start.y = e.clientY
        }
    }
}

onMounted(() => {
    init()
})
</script>

<style lang="scss" scoped>
svg {
  vertical-align: unset;
}
.img-clip {
  .crop-container {
    position: relative;
    display: inline-block;
    margin: 20px;
  }

  #imagePreview {
    max-width: 100%;
    display: block;
  }

  .crop-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
  }

  .crop-handle {
    width: 14px;
    height: 14px;
    position: absolute;
    // transform: translate(-50%, -50%); /* 让中心点对准目标位置 */
    background-color: white;
    border-radius: 50%;
    cursor: move;
  }

  #handleTL {
    top: 0;
    left: 0;
  }

  #handleTR{
    top:0;
    right: 0;
  }

  #handleBL{
    bottom:0;
    left:0
  }

  #handleBR{
    right: 0;
    bottom: 0;
  }

  #cropResult {
    margin-top: 20px;
    max-width: 100%;
  }
}
</style>
