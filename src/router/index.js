import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: ()=> import("@/views/home.vue")
        },
        {
            path: '/imageConvert',
            name: 'ImageConvert',
            component: ()=> import("@/views/imageConvert/jpg2png.vue"),
            children: [
                {
                    path: 'jpg2png',
                    name: "Jpg2png",
                    component: ()=> import("@/views/imageConvert/jpg2png.vue")
                }
            ]
        }
    ]
})

export default router