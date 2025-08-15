import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/imageClip'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home.vue')
        },
        {
            path: '/imageClip',
            name: 'ImageClip',
            component: () => import('@/views/imageClip/index.vue'),
            children: [
                {
                    path: 'imageConvert',
                    name: 'ImageConvert',
                    component: () => import('@/views/imageClip/imageConvert.vue')
                },
                {
                    path: 'imageCrop',
                    name: 'ImageCrop',
                    component: () => import('@/views/imageClip/imageCrop.vue')
                },
                {
                    path: 'imageSize',
                    name: 'ImageSize',
                    component: () => import('@/views/imageClip/imageSize.vue')
                },
                {
                    path: 'imageFlip',
                    name: 'ImageFlip',
                    component: () => import('@/views/imageClip/imageFlip.vue')
                },
                {
                    path: 'imageSharpen',
                    name: 'ImageSharpen',
                    component: () => import('@/views/imageClip/imageSharpen.vue')
                },
                {
                    path: 'imageStitcher',
                    name: 'ImageStitcher',
                    component: () => import('@/views/imageClip/imageStitcher.vue')
                },
                {
                    path: 'imageCompress',
                    name: 'ImageCompress',
                    component: () => import('@/views/imageClip/imageCompress.vue')
                },
            ]
        },
        {
            path: '/videoClip',
            name: 'VideoClip',
            component: () => import('@/views/videoClip/index.vue'),
        },
        {
            path: '/textClip',
            name: 'TextClip',
            component: () => import('@/views/textClip/index.vue'),
            children: [
                {
                    path: 'textVoice',
                    name: 'TextVoice',
                    component: () => import('@/views/textClip/textVoice.vue')
                }
            ]
        }
    ]
})

export default router
