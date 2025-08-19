<template>
    <div class="image-color">
        <div class="container">
            <header>
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片色彩调整
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
                    <div class="function-methods w-100">
                        <div
                            v-for="method in funcMethods"
                            :key="method.label"
                            class="function-method align-items-center"
                        >
                            <label>{{ method.label }}</label>
                            <el-switch
                                v-if="method.type === Boolean"
                                v-model="method.value"
                                inline-prompt
                                :active-icon="Check"
                                :inactive-icon="Close"
                            />
                            <el-slider
                                v-else
                                v-model="method.value"
                                :min="method.min"
                                :max="method.max"
                                :step="method.step"
                            />
                        </div>
                    </div>
                    <div
                        v-if="file"
                        class="function-start"
                    >
                        <el-button
                            type="primary"
                            @click="start">
                            应用效果
                        </el-button>
                        <el-button
                            v-if="targetSrc"
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
                    <div class="source">
                        <img
                            :src="`file://${file.path}`"
                            alt=""
                        >
                    </div>
                    <div
                        v-if="targetSrc"
                        class="target"
                    >
                        <img
                            :src="targetSrc"
                            alt=""
                        >
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { Check, Close } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()

const funcMethods = ref([
    {
        name: 'brightness',
        label: '亮度',
        value: 1,
        min: 0,
        max: 10,
        step: 0.1
    },
    {
        name: 'saturation',
        label: '饱和度',
        value: 1,
        min: 0,
        max: 10,
        step: 0.1
    },
    {
        name: 'hue',
        label: '色相旋转',
        value: 0,
        min: 0,
        max: 360,
        step: 1
    },
    {
        name: 'contrast',
        label: '对比度',
        value: 1,
        min: 0,
        max: 10,
        step: 0.1
    },
    {
        name: 'Gamma',
        label: 'Gamma校正',
        value: 1,
        min: 0.5,
        max: 5,
        step: 0.1
    },
    {
        name: 'negate',
        label: '图像反相',
        value: false,
        type: Boolean
    },
    {
        name: 'grayscale',
        label: '黑白',
        value: false,
        type: Boolean
    },
    {
        label: '色温(未实现)',
        value: 0
    },
])

const targetSrc = ref('')

const file = computed(() => store.file || '')

watch(() => file.value, () => {
    targetSrc.value = ''
})

async function start() {
    const args = funcMethods.value.map((x) => {
        const obj = {}
        obj[x.name] = x.value
        return obj
    })
    const obj = Object.assign({}, { ...file.value }, ...args)
    const base64 = await window.electronAPI.imageColor(obj)
    targetSrc.value = `data:image/jpeg;base64,${base64}`
}

function save() {
    window.electronAPI.saveBase64File({ ...file.value, base64: targetSrc.value })
}
</script>

<style lang="scss" scoped>
.image-color{
    label{
        min-width: 100px;
    }
}
</style>
