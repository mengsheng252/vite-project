<template>
    <div class="image-watermark">
        <div class="container">
            <header>
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片添加水印
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    ...
                </p>
            </header>
            <main class="function-content">
                <div class="function-setting">
                    <h2 class="h5 fw-semibold mb-4 d-flex align-items-center">
                        操作面板
                    </h2>
                    <FileUpload class="d-flex flex-column gap-3"></FileUpload>
                    <div class="function-methods w-100 border border-pink mt-3 rounded">
                        <div class="function-method align-items-center">
                            <label for="">水印类型：</label>
                            <el-radio-group
                                v-model="watermarkType"
                                size="large"
                            >
                                <el-radio-button
                                    label="文本"
                                    value="text"
                                />
                                <el-radio-button
                                    label="图片"
                                    value="image"
                                />
                            </el-radio-group>
                        </div>
                        <template v-if="watermarkType === 'text'">
                            <div class="function-method align-items-center">
                                <label for="">内容：</label>
                                <el-input v-model="watermarkText.text"></el-input>
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">文字大小：</label>
                                <!-- <el-slider
                                    v-model="watermarkText.fontSize"
                                    :min="12"
                                    :max="100"
                                /> -->
                                <el-input-number
                                    v-model="watermarkText.fontSize"
                                    :min="12"
                                ></el-input-number>
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">文字颜色：</label>
                                <el-color-picker
                                    v-model="watermarkText.color"
                                    size="large"
                                />
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">透明度：</label>
                                <el-slider
                                    v-model="watermarkText.opacity"
                                    :min="0"
                                    :max="1"
                                    :step="0.1"
                                />
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">角度：</label>
                                <el-slider
                                    v-model="watermarkText.rotate"
                                    :min="0"
                                    :max="360"
                                />
                            </div>
                            <div class="function-method align-items-center">
                                <label>上下移动：</label>
                                <el-input-number
                                    v-model="watermarkText.tx"
                                ></el-input-number>
                            </div>
                            <div class="function-method align-items-center">
                                <label>左右移动：</label>
                                <el-input-number
                                    v-model="watermarkText.ty"
                                ></el-input-number>
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">平铺：</label>
                                <el-switch v-model="watermarkText.cover" />
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">左右间距：</label>
                                <el-input-number
                                    v-model="watermarkText.dx"
                                    :min="0"
                                ></el-input-number>
                            </div>
                            <div class="function-method align-items-center">
                                <label for="">上下间距：</label>
                                <el-input-number
                                    v-model="watermarkText.dy"
                                    :min="0"
                                ></el-input-number>
                            </div>
                        </template>
                    </div>
                    <div
                        v-if="file"
                        class="function-draw my-3"
                    >
                        <el-button
                            type="primary"
                            @click="draw"
                        >
                            绘制
                        </el-button>
                        <el-button
                            type="primary"
                            @click="save"
                        >
                            保存
                        </el-button>
                    </div>
                </div>
                <div
                    v-if="file"
                    class="function-show compare"
                >
                    <div
                        class="source"
                    >
                        <img
                            id="source"
                            :src="`file://${file.path}`"
                            alt=""
                        >
                        <!-- <img
                            id="source"
                            src="@/assets/images/1.jpg"
                            alt=""
                        > -->
                    </div>
                    <div
                        class="target"
                    >
                        <img
                            v-if="targetSrc"
                            :src="targetSrc"
                            alt=""
                        >
                        <!-- <img
                            :src="`file://${file.path}`"
                            alt=""
                        > -->
                        <!-- <img
                            src="@/assets/images/1.jpg"
                            alt=""
                        > -->
                        <canvas id="canvas"></canvas>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'
import Watermark from '../../utils/watermark'

const store = useStore()
const targetSrc = ref('')

const file = computed(() => store.file || '')

const watermarkType = ref('text')

const watermarkText = ref({
    id: 'canvas',
    text: '',
    fontSize: 16,
    color: '#000',
    rotate: 0,
    cover: false,
    dx: 100,
    dy: 100,
    tx: 0,
    ty: 0,
    opacity: 1
})

let watermark

watch(() => file.value, () => {
    targetSrc.value = ''
})

async function draw() {
    const source = document.getElementById('source')
    if (source) {
        watermarkText.value.width = source.naturalWidth
        watermarkText.value.height = source.naturalHeight
    }
    watermark = new Watermark({ ...watermarkText.value })
    await watermark.drawWithImage(`file://${file.value.path}`)
    targetSrc.value = watermark.toBase64('image/png', 0.92)
}

async function save() {
    if (watermark && file.value) {
        // 传入底图路径
        await watermark.drawWithImage(`file://${file.value.path}`)
        const base64 = watermark.toBase64('image/png', 0.92)
        window.electronAPI.saveBase64File({ ...file.value, base64 })
    }
}
</script>

<style lang="scss" scoped>
.image-watermark{
    .function-method{
        >label{
            width: 90px;
        }
    }
    .function-show{
        .target{
            position: relative;
            #canvas{
                position: absolute;
                z-index: 1;
                left: 36px;
                top: 36px;
                display: none;
            }
        }
    }
}
</style>
