<template>
    <div class="text-voice">
        <div class="container">
            <header class="text-center mb-5">
                <h1 class="display-5 fw-bold text-dark mb-3">
                    语音播报
                </h1>
                <p class="text-muted col-md-8 mx-auto">
                    阅读输入文本内容
                </p>
            </header>
            <main class="function-content d-flex align-items-center justify-content-center gap-3">
                <div class="function-show">
                    <el-input
                        v-model="textarea"
                        :rows="2"
                        type="textarea"
                        placeholder="请输入播报内容"
                        maxlength="300"
                        resize="none"
                        show-word-limit
                    />
                </div>
                <div class="function-setting">
                    <el-button
                        type="primary"
                        @click="speak"
                    >
                        播报
                    </el-button>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const textarea = ref('')

// 获取语音合成对象
const synth = window.speechSynthesis
// 创建语音文本
function speak() {
    const text = textarea.value
    if (synth.speaking) {
        synth.cancel() // 如果正在播报，先停止
    }

    const utterance = new SpeechSynthesisUtterance(text)

    // 可选配置
    utterance.rate = 1 // 语速 (0.1~10)
    utterance.pitch = 1 // 音高 (0~2)
    utterance.lang = 'zh-CN' // 语言（中文）

    // 开始播报
    synth.speak(utterance)
    // 调用示例
}
</script>

<style lang="scss" scoped>
.text-voice {
    :deep(.el-textarea){
        width: 400px;
        height: 240px;
        .el-textarea__inner{
            width: 400px;
            height: 240px;
        }

    }
}
</style>
