<!-- src/components/Message.vue -->
<template>
    <div
        v-if="visible"
        class="message"
        :class="[type]">
        {{ text }}
    </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const text = ref('')
const type = ref('success')

function show(message, msgType = 'success') {
    text.value = message
    type.value = msgType
    visible.value = true
    setTimeout(() => (visible.value = false), 3000)
}

// 定义多类型方法
const messageApi = {
    success: msg => show(msg, 'success'),
    error: msg => show(msg, 'error'),
    warning: msg => show(msg, 'warning'),
    info: msg => show(msg, 'info')
}

// 暴露 API
defineExpose(messageApi)
</script>

<style scoped>
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  z-index: 9999;
}
.success { background: #4CAF50; }
.error { background: #F44336; }
.warning { background: #FF9800; }
.info { background: #2196F3; }
</style>
