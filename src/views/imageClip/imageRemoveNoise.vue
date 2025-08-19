<template>
    <div
        v-loading="loading"
        class="image-remove-noise"
    >
        <div class="container">
            <header>
                <h1 class="display-5 fw-bold text-dark mb-3">
                    图片降噪
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
                    <div class="function-methods">
                        <div class="function-method align-items-center">
                            <label for="">消除孤立噪点：</label>
                            <el-radio-group
                                v-model="medianValue"
                                size="large"
                            >
                                <el-tooltip
                                    v-for="item in median"
                                    :key="item.value"
                                    class="box-item"
                                    effect="dark"
                                    :content="item.tip"
                                    placement="top-start"
                                >
                                    <el-radio-button
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-tooltip>
                            </el-radio-group>
                        </div>
                        <div class="function-method">
                            <label for="">平滑连续噪点：</label>
                            <el-radio-group
                                v-model="blurValue"
                                size="large"
                            >
                                <el-tooltip
                                    v-for="item in blur"
                                    :key="item.value"
                                    class="box-item"
                                    effect="dark"
                                    :content="item.tip"
                                    placement="top-start"
                                >
                                    <el-radio-button
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-tooltip>
                            </el-radio-group>
                        </div>
                        <div
                            v-if="file"
                            class="function-method"
                        >
                            <el-button
                                type="primary"
                                @click="start"
                            >
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
import { computed, ref, watch } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import { useStore } from '@/hooks/stores'

const store = useStore()
const file = computed(() => store.file || '')
const targetSrc = ref('')
const loading = ref(false)

const median = ref([
    {
        label: '轻度',
        tip: '保留细节',
        value: 3
    },
    {
        label: '中等',
        tip: '轻微模糊',
        value: 5
    },
    {
        label: '强降噪',
        tip: '可能导致边缘模糊',
        value: 7
    }
])

const blur = ref([
    {
        label: '轻度',
        tip: '保留细节',
        value: 0.3
    },
    {
        label: '中等',
        tip: '轻微模糊',
        value: 1.0
    },
    {
        label: '强降噪',
        tip: '可能导致图片失真',
        value: 2.0
    }
])

const medianValue = ref(3)

const blurValue = ref(0.3)

watch(() => file.value, () => {
    targetSrc.value = ''
})

async function start() {
    loading.value = true
    const base64 = await window.electronAPI.imageRemoveNoise({ ...file.value })
    targetSrc.value = `data:image/jpeg;base64,${base64}`
    loading.value = false
}

function save() {
    window.electronAPI.saveBase64File({ ...file.value, base64: targetSrc.value })
}
</script>

<style lang="scss" scoped>
.image-remove-noise{

}
</style>
