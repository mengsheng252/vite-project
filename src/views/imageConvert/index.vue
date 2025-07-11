<template>
    <div class="image-convert">
        <el-button type="primary" @click="uploadFile">
            上传
        </el-button>
    </div>
</template>

<script setup>
import { doConvert } from '@/hooks/useCommon'

function uploadFile() {
    doConvert()
}
</script>
