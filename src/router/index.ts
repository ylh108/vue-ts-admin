import Vue from 'vue'
import Router from 'vue-router'
import Home from './home'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            meta: { keepAlive: false },
            component: () => import('@/views/login/index.vue')
        },
        { ...Home },
        {
            path: '/print',
            name: 'print',
            meta: { keepAlive: true },
            component: () => import('@/components/print/index.vue')
        },
        {
            path: '*',
            redirect: '/home' // 其他未定义的路由重定向到 home 页
        }
    ]
})

// 路由拦截器
router.beforeEach((to: any, from: any, next: any) => {
    if (to.fullPath === '/login') {
        sessionStorage.clear()
    }
    if (!sessionStorage.getItem('treeData') && to.fullPath !== '/login') {
        next({
            path: '/login',
            replace: true
        })
    } else {
        next()
    }
})

export default router
