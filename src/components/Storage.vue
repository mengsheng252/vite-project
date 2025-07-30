<template>
    <div class="storage mb-3">
        <div class="sotrage-path d-flex align-items-center">
            <div class="path-label">
                保存路径：
            </div>
            <div
                class="select-storage-path btn border border-primary text-ellipsis"
                :title="storagePath"
                @click="handlePath"
            >
                {{ storagePath }}
            </div>
            <el-button
                type="primary"
                class="ms-3"
                @click="openFolder">
                立即查看
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { openFolder } from '@/hooks/useCommon'

const storagePath = ref('')

/**
 * 选择保存路径
 */
async function handlePath() {
    storagePath.value = await window.electronAPI.handlePath()
}

onMounted(async () => {
    // 获取桌面路径作为默认存储地址
    storagePath.value = await window.electronAPI.getDesktopPath()
})
</script>
