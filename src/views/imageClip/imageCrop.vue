<template>
    <div
        v-loading="loading"
        class="image-crop p-3">
        <div class="container">
            <FileUpload></FileUpload>
            <img-crop
                v-if="src"
                :src="src"></img-crop>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import imgCrop from '@/components/imgCrop.vue'
import { useStore } from '@/hooks/stores'

const loading = ref(false)
const store = useStore()

const src = computed(() => store.file || '')
</script>

<style lang="scss" scoped>
.image-clip{
    user-select: none;
}
</style>
