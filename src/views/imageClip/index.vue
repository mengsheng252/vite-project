<template>
    <div class="image-clip p-3">
        <div class="container">
            <!-- <el-tabs type="border-card" @tab-click="handleTabClick">
                <el-tab-pane label="格式转换" name="imageConvert">
                    <image-convert></image-convert>
                </el-tab-pane>
                <el-tab-pane label="裁剪" name="imageCrop">
                    <image-crop></image-crop>
                </el-tab-pane>
                <el-tab-pane label="调整大小">
                    <image-size></image-size>
                </el-tab-pane>
                <el-tab-pane label="旋转/翻转">
                    顺时针旋转/垂直翻转
                </el-tab-pane>
                <el-tab-pane label="质量压缩">
                    JPEG质量调整(1-100)
                </el-tab-pane>
                <el-tab-pane label="锐化/模糊">
                    高斯模糊/锐化
                </el-tab-pane>
                <el-tab-pane label="色彩调整">
                    亮度，对比度
                </el-tab-pane>
                <el-tab-pane label="去除噪点">
                    减少杂色噪点
                </el-tab-pane>
                <el-tab-pane label="添加水印">
                    添加水印
                </el-tab-pane>
                <el-tab-pane label="边缘检测">
                    突出图像边缘
                </el-tab-pane>
                <el-tab-pane label="油画效果">
                    模拟油画笔触
                </el-tab-pane>
                <el-tab-pane label="生成缩略图">
                    生成缩略图
                </el-tab-pane>
                <el-tab-pane label="图片拼接">
                    水平拼接多张图片
                </el-tab-pane>
                <el-tab-pane label="添加边框">
                    添加10像素红色边框
                </el-tab-pane>
                <el-tab-pane label="混合图片">
                    叠加混合模式
                </el-tab-pane>
                <el-tab-pane label="识别图像信息">
                    查看详细EXIF/色彩空间等信息
                </el-tab-pane>
            </el-tabs> -->
            <div>1111111111111111</div>
        </div>
    </div>
</template>

<script setup>
// import { onMounted, ref } from 'vue'
// import { useStore } from '@/hooks/stores'
// import imageConvert from './imageConvert/index.vue'
// import imageCrop from './imageCrop/index.vue'
// import imageSize from './imageSize.vue'

// const loading = ref(false)

// const src = ref('')

// function handleTabClick(tab) {
//     useStore().setActiveTab(tab.paneName)
// }

// onMounted(() => {
//     // 监听主进程窗口选择的文件列表
//     window.electronAPI.onFileSelected((info) => {
//         src.value = info.paths[0]
//     })
// })
</script>

<style lang="scss" scoped>
.image-clip{
    user-select: none;
}
</style>
