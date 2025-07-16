import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/imageConvert'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home.vue')
        },
        {
            path: '/imageConvert',
            name: 'ImageConvert',
            component: () => import('@/views/imageConvert/index.vue'),
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('@/views/imageConvert/index.vue')
                }
            ]
        },
        {
            path: '/imageClip',
            name: 'ImageClip',
            component: () => import('@/views/ImageClip.vue')
        }
    ]
})

export default router
