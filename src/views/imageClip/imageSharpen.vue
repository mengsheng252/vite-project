<template>
    <div
        v-loading="loading"
        class="image-sharpen"
    >
        <div class="container">
            <header>
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片锐化与模糊处理
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
                    <div class="function-method flex-column">
                        <div class="select-methods">
                            <label for="">功能：</label>
                            <el-radio-group v-model="funcMethod">
                                <el-radio-button
                                    v-for="method in methods"
                                    :key="method.label"
                                    :value="method.label"
                                >
                                    {{ method.label }}
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="selected-method">
                            <div
                                v-for="method in methods"
                                :key="method"
                                class="selected-method-item"
                            >
                                <label for="">{{ `${method.label}：` }}</label>
                                <!-- <el-input-number
                                    v-model="method.value"
                                    :min="0"
                                    :max="100"
                                    :disabled="funcMethod !== method.label"
                                ></el-input-number> -->
                                <el-slider
                                    v-model="method.value"
                                    :min="0"
                                    :max="100"
                                    :disabled="funcMethod !== method.label"
                                />
                            </div>
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
                        class="target">
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
import { computed, ref, watch } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const loading = ref(false)
const store = useStore()
const file = computed(() => store.file || null)
const targetSrc = ref('')
const methods = ref(
    [
        {
            label: '锐化',
            value: 0
        },
        {
            label: '模糊',
            value: 0
        }
    ]
)
const funcMethod = ref(methods.value[0].label)

watch(() => file.value, () => {
    targetSrc.value = ''
})

const arg = computed(() => {
    const data = methods.value.find(x => x.label === funcMethod.value)
    if (data) {
        return data.value
    }
    return 0
})

async function start() {
    if (arg.value === 0) {
        return
    }
    loading.value = true
    let base64
    if (funcMethod.value === '锐化') {
        base64 = await window.electronAPI.imageSharpen({
            ...file.value,
            sharpen: arg.value * 0.1
        })
    }
    else {
        base64 = await window.electronAPI.imageBlur({
            ...file.value,
            blur: arg.value * 0.1
        })
    }
    if (base64) {
        targetSrc.value = `data:image/jpeg;base64,${base64}`
    }
    loading.value = false
}

function save() {
    window.electronAPI.saveBase64File({ ...file.value, base64: targetSrc.value })
}
</script>

<style lang="scss" scoped>
.image-sharpen{
}
</style>
